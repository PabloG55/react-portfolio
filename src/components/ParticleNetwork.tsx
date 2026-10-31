"use client";

import { useEffect, useRef, type RefObject } from "react";

type Rgb = { r: number; g: number; b: number };

// Particles that assemble the hero word, get knocked loose by the cursor and
// rebuild it: "Always Building." The original cursor network stays underneath.
export default function ParticleNetwork({ wordRef }: { wordRef?: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isDark = () => document.documentElement.classList.contains("dark");
    const wordEl = wordRef?.current ?? null;

    let width = 0;
    let height = 0;

    // Ambient network: the original effect, drawn only near the cursor.
    const colors: Rgb[] = [
      { r: 59, g: 130, b: 246 }, // Blue
      { r: 156, g: 163, b: 175 }, // Gray
    ];
    interface Particle { x: number; y: number; vx: number; vy: number; radius: number; baseColor: Rgb }
    let particles: Particle[] = [];
    const seedAmbient = () => {
      const count = Math.min(100, Math.floor((width * height) / 10000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 1,
        baseColor: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    // Word particles: each one has a home inside the glyphs of the word.
    interface Dot { x: number; y: number; vx: number; vy: number; hx: number; hy: number; phase: number; delay: number; accent: boolean }
    let dots: Dot[] = [];
    let dotSize = 2;
    let repelRadius = 100;

    const buildWord = (assemble: boolean) => {
      const el = wordEl;
      if (!el) { dots = []; return; }
      const canvasBox = canvas.getBoundingClientRect();
      const box = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize);
      const text = el.textContent?.trim() ?? "";
      if (!text || !box.width) { dots = []; return; }

      const pad = Math.ceil(fontSize * 0.3);
      const off = document.createElement("canvas");
      off.width = Math.ceil(box.width + pad * 2);
      off.height = Math.ceil(box.height + pad * 2);
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      o.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      if ("letterSpacing" in o) (o as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = style.letterSpacing;
      o.textBaseline = "alphabetic";
      const metrics = o.measureText(text);
      const ascent = metrics.fontBoundingBoxAscent;
      const descent = metrics.fontBoundingBoxDescent;
      const baseline = pad + (box.height - (ascent + descent)) / 2 + ascent;
      o.fillStyle = "#000";
      o.fillText(text, pad, baseline);

      const step = Math.max(2.5, Math.min(5, fontSize / 42));
      dotSize = Math.max(1.8, Math.min(2.6, step * 0.62));
      repelRadius = Math.max(48, Math.min(120, fontSize * 0.4));
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const originX = box.left - canvasBox.left - pad;
      const originY = box.top - canvasBox.top - pad;
      const next: Dot[] = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(Math.floor(y) * off.width + Math.floor(x)) * 4 + 3] < 140) continue;
          const hx = originX + x;
          const hy = originY + y;
          const progress = (x - pad) / box.width;
          next.push({
            hx, hy,
            x: assemble ? Math.random() * width : hx,
            y: assemble ? Math.random() * height : hy,
            vx: 0, vy: 0,
            phase: Math.random() * Math.PI * 2,
            // Assemble left to right, like the word is being built.
            delay: assemble ? 150 + progress * 700 + Math.random() * 300 : 0,
            accent: Math.random() < 0.08,
          });
        }
      }
      dots = next;
      el.dataset.built = "true";
    };

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Actual pointer coordinates (snap instantly) and a trailing copy for the network.
    const mouse = { x: -1000, y: -1000 };
    const currentMouse = { x: -1000, y: -1000 };
    let releaseTimer = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      window.clearTimeout(releaseTimer);
      if (e.pointerType !== "mouse") releaseTimer = window.setTimeout(handleLeave, 700);
    };
    const handleLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const drawDots = (now: number, still: boolean) => {
      const dark = isDark();
      const ink = dark ? "rgba(203, 208, 216, 0.92)" : "rgba(75, 85, 99, 0.9)";
      const blue = dark ? "rgba(96, 155, 250, 0.95)" : "rgba(37, 99, 235, 0.9)";
      const inkPath = new Path2D();
      const bluePath = new Path2D();
      const half = dotSize / 2;
      for (const d of dots) {
        if (!still && now >= d.delay) {
          const tx = d.hx + Math.sin(now * 0.0011 + d.phase) * 0.6;
          const ty = d.hy + Math.cos(now * 0.0013 + d.phase) * 0.6;
          d.vx += (tx - d.x) * 0.028;
          d.vy += (ty - d.y) * 0.028;
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < repelRadius && dist > 0.01) {
            const push = (1 - dist / repelRadius) ** 2 * 6;
            d.vx += (dx / dist) * push;
            d.vy += (dy / dist) * push;
          }
          d.vx *= 0.85;
          d.vy *= 0.85;
          d.x += d.vx;
          d.y += d.vy;
        }
        // Pieces that are out of place (in flight, knocked loose) show the accent.
        const loose = Math.abs(d.x - d.hx) + Math.abs(d.y - d.hy) > 3;
        (loose || d.accent ? bluePath : inkPath).rect(d.x - half, d.y - half, dotSize, dotSize);
      }
      ctx.fillStyle = ink;
      ctx.fill(inkPath);
      ctx.fillStyle = blue;
      ctx.fill(bluePath);
    };

    let animationFrameId = 0;
    let onScreen = true;
    let start = 0;
    const maxDistance = 300;

    const render = (time: number) => {
      if (!start) start = time;
      const now = time - start;
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate currentMouse toward the pointer.
      currentMouse.x += (mouse.x - currentMouse.x) * 0.015;
      currentMouse.y += (mouse.y - currentMouse.y) * 0.015;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dxMouse = currentMouse.x - p.x;
        const dyMouse = currentMouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse >= maxDistance) continue;

        const alpha = (1 - distMouse / maxDistance) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.baseColor.r}, ${p.baseColor.g}, ${p.baseColor.b}, ${alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= 150) continue;
          const dxMouse2 = currentMouse.x - p2.x;
          const dyMouse2 = currentMouse.y - p2.y;
          if (Math.sqrt(dxMouse2 * dxMouse2 + dyMouse2 * dyMouse2) >= maxDistance) continue;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${p.baseColor.r}, ${p.baseColor.g}, ${p.baseColor.b}, ${(1 - dist / 150) * alpha * 0.65})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      drawDots(now, false);
      animationFrameId = requestAnimationFrame(render);
    };

    // Reduced motion: one still frame of the finished word, no loop.
    const drawStill = () => {
      ctx.clearRect(0, 0, width, height);
      drawDots(0, true);
    };

    // Run the loop only while the hero is on screen, the tab is visible and
    // motion is allowed.
    const sync = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
      if (motion.matches) drawStill();
      else if (onScreen && !document.hidden) animationFrameId = requestAnimationFrame(render);
    };

    let ready = false;
    const rebuild = () => {
      // ResizeObserver also fires once on observe; only a real size change rebuilds.
      if (!ready || (canvas.clientWidth === width && canvas.clientHeight === height)) return;
      sizeCanvas();
      seedAmbient();
      buildWord(false);
      sync();
    };
    const resizeObserver = new ResizeObserver(rebuild);
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (ready) sync();
    });
    const handleMotionChange = () => {
      if (!ready) return;
      buildWord(false);
      sync();
    };

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      sizeCanvas();
      seedAmbient();
      buildWord(!motion.matches);
      ready = true;
      resizeObserver.observe(canvas);
      observer.observe(canvas);
      sync();
    });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    motion.addEventListener("change", handleMotionChange);
    document.addEventListener("visibilitychange", sync);

    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
      motion.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", sync);
      resizeObserver.disconnect();
      observer.disconnect();
      window.clearTimeout(releaseTimer);
      cancelAnimationFrame(animationFrameId);
      if (wordEl) delete wordEl.dataset.built;
    };
  }, [wordRef]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />
    </div>
  );
}
