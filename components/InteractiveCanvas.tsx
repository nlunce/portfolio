'use client';

import React, { useEffect, useRef } from 'react';

const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseMoved = false;

    const pointer = {
      x: 0.5 * window.innerWidth,
      y: 0.5 * window.innerHeight,
    };

    const params = {
      pointsNumber: 30, // Number of points in the trail. Higher values create a longer trail.
      widthFactor: 11, // Multiplier for the width of the trail lines. Higher values make the trail appear thicker.
      mouseThreshold: 0.9, // Sensitivity to mouse movement. Smaller values make the blob react to finer movements.
      spring: 0.1, // Spring strength for the trail's movement. Higher values make the trail catch up faster to the pointer.
      friction: 0.5, // Friction applied to the trail's velocity. Lower values allow the trail to move faster and decay more slowly.
    };

    const trail = new Array(params.pointsNumber).fill(null).map(() => ({
      x: pointer.x,
      y: pointer.y,
      dx: 0,
      dy: 0,
    }));

    const updateMousePosition = (eX: number, eY: number) => {
      pointer.x = eX;
      pointer.y = eY;
    };

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const update = (t: number) => {
      if (!mouseMoved) {
        pointer.x =
          (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
          window.innerWidth;
        pointer.y =
          (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
          window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;

        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;

        p.dx *= params.friction;
        p.dy *= params.friction;

        p.x += p.dx;
        p.y += p.dy;
      });

      // Retrieve the --accent-tertiary color
      const accentTertiary = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-tertiary')
        .trim();

      // Create gradient using --accent-tertiary
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, accentTertiary);
      gradient.addColorStop(1, `${accentTertiary}80`); // Semi-transparent version for a subtle fade effect

      ctx.strokeStyle = gradient;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 30; // Add shadow blur
      ctx.shadowColor = accentTertiary; // Use the accent-tertiary color for shadow
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
      }

      ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
      ctx.stroke();

      window.requestAnimationFrame(update);
    };

    setupCanvas();
    update(0);

    window.addEventListener('resize', setupCanvas);

    window.addEventListener('click', (e) => {
      updateMousePosition(e.pageX, e.pageY);
    });

    window.addEventListener('mousemove', (e) => {
      mouseMoved = true;
      updateMousePosition(e.pageX, e.pageY);
    });

    window.addEventListener('touchmove', (e) => {
      mouseMoved = true;
      updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    });

    return () => {
      window.removeEventListener('resize', setupCanvas);
      window.removeEventListener('click', (e) => {
        updateMousePosition(e.pageX, e.pageY);
      });
      window.removeEventListener('mousemove', (e) => {
        updateMousePosition(e.pageX, e.pageY);
      });
      window.removeEventListener('touchmove', (e) => {
        updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', filter: 'blur(50px)' }}
    />
  );
};

export default InteractiveCanvas;
