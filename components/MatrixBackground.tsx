'use client';
import { useEffect, useRef, useState } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
  const fontSize = 10;
  const columns = useRef(0);
  const drops = useRef<number[]>([]);
  const speeds = useRef<number[]>([]); // Track variable speeds for each column

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns.current = canvas.width / fontSize;
      drops.current = Array(Math.floor(columns.current)).fill(0);
      // Initialize random speeds for each column
      speeds.current = Array(Math.floor(columns.current)).fill(0).map(() => 
        0.05 + Math.random() * 0.15);
    };

    // Check if element is in viewport to improve performance
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      if (!ctx || !canvas || !isVisible) return;

      // Better fade effect for trails - darker background for better contrast
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.current.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops.current[i] * fontSize;

        // Randomly make some characters white for highlight effects
        if (Math.random() > 0.98) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        } else {
          // Vary the brightness of the green characters - increase saturation
          const brightness = 0.5 + Math.random() * 0.5;
          ctx.fillStyle = `rgba(0, 255, 157, ${brightness})`;
        }

        ctx.fillText(text, x, y);

        // Reset logic with variable column heights and timing
        if (y > canvas.height) {
          if (Math.random() > 0.98) {
            drops.current[i] = 0;
            // Randomize speed again for variation
            speeds.current[i] = 0.05 + Math.random() * 0.15;
          }
        }

        // Apply variable speed for each column
        drops.current[i] += speeds.current[i];
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0 opacity-25 pointer-events-none"
    />
  );
};

export default MatrixBackground;