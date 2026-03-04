"use client";

import React, { useEffect, useRef } from "react";

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Use colors that match the site theme (Tailwind blue-500, purple-500, gray-400)
    const colors = [
      { r: 59, g: 130, b: 246 }, // Blue
      { r: 156, g: 163, b: 175 }, // Gray
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseColor: { r: number; g: number; b: number };
    }

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 3 + 1,
      baseColor: colors[Math.floor(Math.random() * colors.length)],
    });

    const updateParticle = (p: Particle) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    };

    const particles: Particle[] = [];
    // Adjust density based on screen size (denser for more showy effect)
    const numParticles = Math.floor((width * height) / 6000);

    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle());
    }

    // Actual mouse coordinates (snaps instantly)
    const mouse = { x: -1000, y: -1000 };
    // Interpolated mouse coordinates (trails smoothly)
    const currentMouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to the canvas if scrolled
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const maxDistance = 450; // The radius of visibility around the mouse

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate currentMouse toward actual mouse position
      // The lower the multiplier, the "softer" and more delayed the movement
      currentMouse.x += (mouse.x - currentMouse.x) * 0.015;
      currentMouse.y += (mouse.y - currentMouse.y) * 0.015;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        updateParticle(p);

        // Calculate distance to smoothly trailing mouse
        const dxMouse = currentMouse.x - p.x;
        const dyMouse = currentMouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        // Only draw interactions if the particle is near the mouse
        if (distMouse < maxDistance) {
          // The closer to the mouse, the more opaque it is. Boosted multiplier for brightness.
          const alpha = Math.min(1, (1 - distMouse / maxDistance) * 2.0);

          // Draw the particle itself making it fully solid
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.baseColor.r}, ${p.baseColor.g}, ${p.baseColor.b}, ${alpha})`;
          ctx.fill();

          // Connect to nearby particles to form a network
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
              // Ensure p2 is also near the trailing mouse
              const dxMouse2 = currentMouse.x - p2.x;
              const dyMouse2 = currentMouse.y - p2.y;
              const distMouse2 = Math.sqrt(
                dxMouse2 * dxMouse2 + dyMouse2 * dyMouse2,
              );

              if (distMouse2 < maxDistance) {
                const lineAlpha = (1 - dist / 150) * alpha; // Fades based on connection length AND mouse proximity
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(${p.baseColor.r}, ${p.baseColor.g}, ${p.baseColor.b}, ${lineAlpha})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden opacity-100 transition-opacity duration-1000">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
