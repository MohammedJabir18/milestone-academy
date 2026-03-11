import React, { useEffect, useRef } from 'react';

/**
 * A performant canvas-based background animation with:
 * - Floating particles
 * - Subtle grid lines
 * - Candlestick chart ghosts
 * - Sine-wave market curves
 * All drawn at very low opacity so they don't compete with content.
 */
const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ─── Particles ───────────────────────────────────
    const PARTICLE_COUNT = 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      g: Math.floor(Math.random() * 80) + 170, // green channel 170-250
      a: Math.random() * 0.06 + 0.02,
    }));

    // ─── Grid lines ──────────────────────────────────
    const GRID_COUNT = 8;
    const gridLines = Array.from({ length: GRID_COUNT * 2 }, (_, i) => ({
      vertical: i < GRID_COUNT,
      pos: Math.random() * (i < GRID_COUNT ? width : height),
      speed: Math.random() * 0.15 + 0.05,
      opacity: Math.random() * 0.04 + 0.01,
    }));

    // ─── Candlesticks ────────────────────────────────
    const CANDLE_COUNT = 12;
    const candles = Array.from({ length: CANDLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      w: Math.random() * 8 + 3,
      h: Math.random() * 35 + 12,
      green: Math.random() > 0.5,
      a: Math.random() * 0.06 + 0.03,
      speed: Math.random() * 0.35 + 0.08,
    }));

    // ─── Waves ───────────────────────────────────────
    const WAVE_COUNT = 4;
    const waves = Array.from({ length: WAVE_COUNT }, (_, i) => ({
      yBase: height * ((i + 1) / (WAVE_COUNT + 1)),
      amp: Math.random() * 18 + 10,
      freq: Math.random() * 0.008 + 0.004,
      speed: Math.random() * 0.0004 + 0.0001,
      g: Math.floor(Math.random() * 80) + 170,
      a: Math.random() * 0.06 + 0.02,
    }));

    // ─── Render loop ─────────────────────────────────
    const draw = (t: number) => {
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0a0a0a');
      grad.addColorStop(1, '#0f0f12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Waves
      for (const w of waves) {
        ctx.strokeStyle = `rgba(0,${w.g},60,${w.a})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const y = w.yBase + Math.sin(x * w.freq + t * w.speed) * w.amp;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Grid
      for (const g of gridLines) {
        ctx.strokeStyle = `rgba(0,200,83,${g.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        if (g.vertical) {
          g.pos += g.speed;
          if (g.pos > width) g.pos = 0;
          ctx.moveTo(g.pos, 0);
          ctx.lineTo(g.pos, height);
        } else {
          g.pos += g.speed;
          if (g.pos > height) g.pos = 0;
          ctx.moveTo(0, g.pos);
          ctx.lineTo(width, g.pos);
        }
        ctx.stroke();
      }

      // Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > width || p.x < 0) p.vx *= -1;
        if (p.y > height || p.y < 0) p.vy *= -1;
        ctx.fillStyle = `rgba(0,${p.g},50,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Candlesticks
      for (const c of candles) {
        c.y -= c.speed;
        c.a -= 0.00035;
        if (c.y < -c.h || c.a <= 0) {
          c.y = height + c.h;
          c.x = Math.random() * width;
          c.green = Math.random() > 0.5;
          c.h = Math.random() * 35 + 12;
          c.a = Math.random() * 0.06 + 0.03;
        }
        const color = c.green
          ? `rgba(0,200,83,${c.a})`
          : `rgba(255,70,70,${c.a * 0.7})`;
        ctx.fillStyle = color;
        ctx.fillRect(c.x, c.y, c.w, c.h);
        // wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.8;
        const wx = c.x + c.w / 2;
        ctx.beginPath();
        ctx.moveTo(wx, c.y - c.h * 0.25);
        ctx.lineTo(wx, c.y + c.h * 1.25);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default BackgroundAnimation;
