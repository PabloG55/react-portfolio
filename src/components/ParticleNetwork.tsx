"use client";

import { useEffect, useRef, type RefObject } from "react";

type Rgb = { r: number; g: number; b: number };

// Particles that assemble the hero word, get knocked loose by the cursor and
// rebuild it: "Always Building." The original cursor network stays underneath.
// The shark touch: the B carries the logo's serrated stem, and a particle fin
// swims along a waterline under the word.
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
    // kind: 0 letter, 1 period, 2 fin.
    interface Dot {
      x: number; y: number; vx: number; vy: number; hx: number; hy: number;
      phase: number; delay: number; accent: boolean; kind: 0 | 1 | 2;
      lx: number; ly: number;
    }
    let dots: Dot[] = [];
    let dotSize = 2;
    let roundSize = 2;
    let repelRadius = 100;
    let wobble = 0.6;

    // Fin: a dorsal fin that cruises a waterline under the word.
    const fin = { on: false, wl: 0, left: 0, right: 0, fh: 0, fw: 0, x: 0, dir: 1, sink: 1, spacing: 3 };
    let water: { bx: number; x: number; y: number }[] = [];

    const makeDot = (hx: number, hy: number, kind: Dot["kind"], progress: number, assemble: boolean, accent: boolean, lx = 0, ly = 0): Dot => ({
      hx, hy, lx, ly, kind, accent,
      x: assemble ? Math.random() * width : hx,
      y: assemble ? Math.random() * height : hy,
      vx: 0, vy: 0,
      phase: Math.random() * Math.PI * 2,
      // Assemble left to right, like the word is being built.
      delay: assemble ? 150 + progress * 700 + Math.random() * 300 : 0,
    });

    const buildWord = (assemble: boolean) => {
      const el = wordEl;
      fin.on = false;
      water = [];
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

      // Phones get a lighter render: the same spacing with smaller particles,
      // so the heavy letters stay open instead of filling in.
      const small = fontSize < 120;
      const step = small ? 2.5 : Math.max(3.4, Math.min(5, fontSize / 42));
      dotSize = small ? 1.25 : Math.max(1.9, Math.min(2.6, step * 0.6));
      wobble = small ? 0.25 : 0.6;
      const accentShare = small ? 0.03 : 0.08;
      roundSize = dotSize * (small ? 1.12 : 1.05);
      repelRadius = Math.max(48, Math.min(120, fontSize * 0.4));

      const W = off.width;
      const H = off.height;
      let data = o.getImageData(0, 0, W, H).data;
      const inkAt = (x: number, y: number) => data[(Math.round(y) * W + Math.round(x)) * 4 + 3] >= 140;
      const colInk = (x: number, y0: number, y1: number) => {
        for (let y = Math.max(0, y0); y <= Math.min(H - 1, y1); y++) if (inkAt(x, y)) return true;
        return false;
      };

      // The period becomes the logo's round blue dot: find it as the last ink
      // on the baseline band (nothing above it). It is rebuilt below in rings.
      const bandTop = Math.round(baseline - fontSize * 0.22);
      const bandBot = Math.round(baseline + 2);
      let dot: { x: number; y: number; r: number } | null = null;
      let pr = W - 1;
      while (pr > 0 && !colInk(pr, bandTop, bandBot)) pr--;
      let pl = pr;
      while (pl > 0 && colInk(pl - 1, bandTop, bandBot)) pl--;
      if (pr > pl && !colInk(Math.round((pl + pr) / 2), 0, bandTop - 1)) {
        let pt = bandBot;
        let pb = bandTop;
        for (let x = pl; x <= pr; x++) for (let y = bandTop; y <= bandBot; y++) if (inkAt(x, y)) { pt = Math.min(pt, y); pb = Math.max(pb, y); }
        const side = Math.max(pr - pl, pb - pt);
        // Same visual weight as the square period, a touch larger on phones
        // so it still reads as round at 390.
        dot = { x: (pl + pr) / 2, y: (pt + pb) / 2, r: side * (small ? 0.68 : 0.6) };
        o.clearRect(pl - 2, pt - 2, pr - pl + 5, pb - pt + 5);
      }

      // The logo's serrated P stem, cut into the B: a straight
      // zigzag of sharp teeth down the stem's left side, from just under the
      // top-left corner to about the bottom of the upper bowl. Proportions are
      // measured from logo2: the cut spans 7%-68% of the cap height, valleys
      // reach 65% into the stem, tips stop 8% in, six teeth.
      const bm = o.measureText(text[0]);
      const bx = Math.round(pad - bm.actualBoundingBoxLeft);
      const capH = bm.actualBoundingBoxAscent;
      const by = baseline - capH;
      const row = Math.round(by + capH * 0.3);
      let sw = 0;
      while (sw < fontSize && inkAt(bx + sw + 1, row)) sw++;
      sw = Math.max(sw, fontSize * 0.12);
      const yTop = by + capH * 0.07;
      const yBot = by + capH * 0.68;
      // Five on phones so each tooth is still several particles tall at 390.
      const teeth = small ? 5 : 6;
      const pitch = (yBot - yTop) / teeth;
      const zig: [number, number][] = [[bx - 1, yTop]];
      for (let i = 0; i < teeth; i++) {
        zig.push([bx + sw * 0.65, yTop + pitch * (i + 0.5)]);
        zig.push(i < teeth - 1 ? [bx + sw * 0.08, yTop + pitch * (i + 1)] : [bx - 1, yBot]);
      }
      const zigX = (y: number) => {
        if (y < yTop || y > yBot) return -Infinity;
        for (let i = 1; i < zig.length; i++) {
          const [x0, y0] = zig[i - 1];
          const [x1, y1] = zig[i];
          if (y <= y1) return x0 + ((x1 - x0) * (y - y0)) / (y1 - y0 || 1);
        }
        return -Infinity;
      };
      o.save();
      o.globalCompositeOperation = "destination-out";
      o.beginPath();
      o.moveTo(bx - 4, yTop);
      for (const [x, y] of zig) o.lineTo(x, y);
      o.lineTo(bx - 4, yBot);
      o.closePath();
      o.fill();
      o.restore();
      data = o.getImageData(0, 0, W, H).data;

      const originX = box.left - canvasBox.left - pad;
      const originY = box.top - canvasBox.top - pad;
      const next: Dot[] = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(Math.floor(y) * W + Math.floor(x)) * 4 + 3] < 140) continue;
          if (x < zigX(y) + step * 0.3) continue;
          next.push(makeDot(originX + x, originY + y, 0, (x - pad) / box.width, assemble, Math.random() < accentShare));
        }
      }
      // The serrated edge is traced at the grid's own spacing so the teeth
      // stay sharp without reading as a drawn line.
      for (let i = 1; i < zig.length; i++) {
        const [x0, y0] = zig[i - 1];
        const [x1, y1] = zig[i];
        const n = Math.max(2, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / (step * 0.95)));
        for (let j = i === 1 ? 0 : 1; j <= n; j++) {
          const x = x0 + ((x1 - x0) * j) / n;
          const y = y0 + ((y1 - y0) * j) / n;
          if (x >= zig[0][0] + 1) next.push(makeDot(originX + x, originY + y, 0, 0, assemble, false));
        }
      }

      // The period, laid out in concentric rings so it reads as a circle.
      if (dot) {
        const sp = step * (small ? 0.72 : 0.78);
        const rings = Math.max(2, Math.round(dot.r / sp));
        for (let k = 0; k <= rings; k++) {
          const rk = (k / rings) * dot.r;
          const count = k === 0 ? 1 : Math.round((Math.PI * 2 * rk) / sp);
          const turn = Math.random() * Math.PI * 2;
          for (let i = 0; i < count; i++) {
            const a = turn + (i / count) * Math.PI * 2;
            const x = dot.x + Math.cos(a) * rk;
            const y = dot.y + Math.sin(a) * rk;
            next.push(makeDot(originX + x, originY + y, 1, 1, assemble, true));
          }
        }
      }

      const gm = o.measureText("g");
      const fh = Math.max(18, fontSize * 0.17);
      const fw = fh * 1.3;
      const wl = originY + baseline + Math.max(gm.actualBoundingBoxDescent, fontSize * 0.18) + fontSize * 0.07;
      Object.assign(fin, {
        on: true, wl, fh, fw, sink: 1,
        left: originX + pad, right: originX + pad + metrics.width,
        spacing: step * (small ? 0.8 : 0.75),
      });
      // Fin profile in fin units, swimming toward +x: a convex leading edge
      // up to a swept-back tip, a concave trailing edge down to the water.
      const shape = new Path2D();
      const fx = (u: number) => fw * (u + 0.55);
      const fy = (v: number) => fh * (v + 1.02);
      shape.moveTo(fx(0.5), fy(0));
      shape.quadraticCurveTo(fx(0.22), fy(-0.82), fx(-0.42), fy(-1));
      shape.quadraticCurveTo(fx(-0.2), fy(-0.42), fx(-0.3), fy(0));
      shape.closePath();
      const fc = document.createElement("canvas");
      fc.width = Math.ceil(fw * 1.15);
      fc.height = Math.ceil(fh * 1.1);
      const f = fc.getContext("2d", { willReadFrequently: true });
      if (f) {
        f.fill(shape);
        const fd = f.getImageData(0, 0, fc.width, fc.height).data;
        const s = fin.spacing;
        const add = (px: number, py: number) => next.push(makeDot(0, 0, 2, 1, false, true, px / fw - 0.55, py / fh - 1.02));
        for (let y = s / 2; y < fc.height; y += s) for (let x = s / 2; x < fc.width; x += s) {
          if (fd[(Math.floor(y) * fc.width + Math.floor(x)) * 4 + 3] >= 160) add(x, y);
        }
        // Trace the two edges so the silhouette is crisp.
        const edge = (x0: number, y0: number, cx: number, cy: number, x1: number, y1: number) => {
          const len = Math.hypot(x1 - x0, y1 - y0) * 1.2;
          const n = Math.max(6, Math.round(len / (s * 0.8)));
          for (let i = 0; i <= n; i++) {
            const t = i / n;
            add((1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1, (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1);
          }
        };
        edge(fx(0.5), fy(0), fx(0.22), fy(-0.82), fx(-0.42), fy(-1));
        edge(fx(-0.42), fy(-1), fx(-0.2), fy(-0.42), fx(-0.3), fy(0));
      }
      // The water: a faint row of particles the fin cuts through.
      const ws = step * 1.5;
      for (let x = fin.left - fontSize * 0.1; x <= fin.right + fontSize * 0.1; x += ws) water.push({ bx: x, x, y: wl });

      dots = next;
      el.dataset.built = "true";
    };

    // Fin timeline: surface, glide, dive, stay under, resurface elsewhere.
    const FIN_START = 1800;
    const RISE = 900;
    const GLIDE = 7600;
    const UNDER = 3200;
    const CYCLE = RISE + GLIDE + RISE + UNDER;
    const hash = (n: number) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
    const ease = (t: number) => t * t * (3 - 2 * t);
    const placeFin = (now: number, still: boolean) => {
      if (!fin.on) return;
      const span = fin.right - fin.left;
      if (still) {
        fin.dir = 1;
        fin.x = fin.left + span * 0.68;
        fin.sink = 0;
      } else {
        const t = now - FIN_START;
        if (t < 0) { fin.sink = 1; fin.x = fin.left + span * 0.2; return; }
        const k = Math.floor(t / CYCLE);
        const c = t - k * CYCLE;
        fin.dir = k % 2 === 0 ? 1 : -1;
        const travel = span * 0.6;
        const room = span * 0.9 - travel;
        const startX = fin.left + span * 0.05 + room * hash(k);
        const x0 = fin.dir > 0 ? startX : startX + travel;
        const moving = Math.min(c, RISE * 2 + GLIDE) / (RISE * 2 + GLIDE);
        fin.x = x0 + fin.dir * travel * moving;
        fin.sink = c < RISE ? 1 - ease(c / RISE)
          : c < RISE + GLIDE ? 0
          : c < RISE * 2 + GLIDE ? ease((c - RISE - GLIDE) / RISE)
          : 1;
      }
      const bob = still ? 0 : Math.sin(now * 0.0021) * fin.fh * 0.025;
      const depth = fin.sink * (fin.fh * 1.1 + 4);
      for (const d of dots) {
        if (d.kind !== 2) continue;
        d.hx = fin.x + fin.dir * d.lx * fin.fw;
        d.hy = fin.wl + d.ly * fin.fh + depth + bob;
        if (still || fin.sink >= 1) { d.x = d.hx; d.y = d.hy; d.vx = 0; d.vy = 0; }
      }
      // The surface rises in a bow wave ahead of the fin and ripples behind it.
      const lift = (1 - fin.sink) * fin.fh;
      for (const w of water) {
        const u = (w.bx - fin.x) * fin.dir / fin.fw;
        const bow = -0.11 * Math.exp(-(((u - 0.45) / 0.45) ** 2));
        const wake = u < 0 ? 0.07 * Math.sin(u * 3.2 - now * 0.006) * Math.exp(u / 2.2) : 0;
        w.y = fin.wl + lift * (bow + wake);
        w.x = w.bx + lift * 0.1 * Math.sign(w.bx - fin.x) * Math.exp(-((u / 0.7) ** 2));
      }
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
      placeFin(now, still);
      const inkPath = new Path2D();
      const bluePath = new Path2D();
      const roundPath = new Path2D();
      const half = dotSize / 2;
      const rr = roundSize / 2;
      const finCx = fin.x;
      const finCy = fin.wl - fin.fh * 0.4;
      const finReach = fin.fh * 0.95;
      const finPush = fin.on ? 1 - fin.sink : 0;
      for (const d of dots) {
        if (!still && now >= d.delay) {
          const tx = d.hx + Math.sin(now * 0.0011 + d.phase) * wobble;
          const ty = d.hy + Math.cos(now * 0.0013 + d.phase) * wobble;
          const k = d.kind === 2 ? 0.06 : 0.028;
          d.vx += (tx - d.x) * k;
          d.vy += (ty - d.y) * k;
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < repelRadius && dist > 0.01) {
            const push = (1 - dist / repelRadius) ** 2 * 6;
            d.vx += (dx / dist) * push;
            d.vy += (dy / dist) * push;
          }
          // Letters part around the fin as it passes, like water.
          if (finPush > 0 && d.kind === 0) {
            const fx = d.x - finCx;
            const fy = d.y - finCy;
            const fd = Math.sqrt(fx * fx + fy * fy);
            if (fd < finReach && fd > 0.01) {
              const p = (1 - fd / finReach) ** 2 * 1.6 * finPush;
              d.vx += (fx / fd) * p;
              d.vy += (fy / fd) * p;
            }
          }
          const damp = d.kind === 2 ? 0.78 : 0.85;
          d.vx *= damp;
          d.vy *= damp;
          d.x += d.vx;
          d.y += d.vy;
        }
        if (d.kind !== 0) {
          // Fin: only the part above the water shows.
          if (d.kind === 2 && (fin.sink >= 1 || d.y > fin.wl - 0.5)) continue;
          roundPath.moveTo(d.x + rr, d.y);
          roundPath.arc(d.x, d.y, rr, 0, Math.PI * 2);
          continue;
        }
        // Pieces that are out of place (in flight, knocked loose) show the accent.
        const loose = Math.abs(d.x - d.hx) + Math.abs(d.y - d.hy) > 3;
        (loose || d.accent ? bluePath : inkPath).rect(d.x - half, d.y - half, dotSize, dotSize);
      }
      ctx.fillStyle = ink;
      ctx.fill(inkPath);
      ctx.fillStyle = blue;
      ctx.fill(bluePath);
      ctx.fill(roundPath);
      if (fin.on && water.length) {
        // Faint everywhere, clearer where the fin disturbs it.
        const wr = Math.max(0.8, dotSize * 0.42);
        for (const w of water) {
          const near = Math.exp(-((((w.bx - fin.x) / (fin.fw * 2.2)) ** 2))) * (1 - fin.sink);
          // Fades out toward both ends so it reads as water, not a rule.
          const along = (w.bx - water[0].bx) / (water[water.length - 1].bx - water[0].bx || 1);
          const taper = Math.sin(Math.PI * Math.min(1, Math.max(0, along)));
          ctx.globalAlpha = (dark ? 0.2 : 0.24) * taper + near * 0.5;
          ctx.fillStyle = near > 0.35 ? blue : ink;
          ctx.beginPath();
          ctx.arc(w.x, w.y, wr, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
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

    // Reduced motion: one still frame of the finished word, no loop. The fin
    // rests on the water at a fixed spot.
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
