'use client';
import { useEffect, useRef, useState } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
  const fontSize = 0.625; // Changed from 10px to 0.625rem
  const columns = useRef(0);
  
  // EFFECT: Column tracking - stores the vertical position of each character column
  const drops = useRef<number[]>([]);
  
  // EFFECT: Variable speeds - creates a more natural, organic falling pattern
  const speeds = useRef<number[]>([]); 
  
  // EFFECT: Character persistence - keeps characters consistent until changed
  const charIndices = useRef<number[]>([]);
  
  // EFFECT: Variable glow - adds visual depth to the matrix rain
  const glowIntensity = useRef<number[]>([]);
  
  // EFFECT: Color variation - creates a more visually rich display
  // with subtle variations of the emerald green theme
  const colorVariations = [
    { r: 0, g: 255, b: 157 }, // Default emerald
    { r: 50, g: 255, b: 180 }, // Light emerald
    { r: 0, g: 230, b: 140 }, // Dark emerald
    { r: 0, g: 200, b: 100 }, // Very dark emerald
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns.current = canvas.width / (fontSize * 16); // Convert rem to px for calculation
      const columnCount = Math.floor(columns.current);
      
      // EFFECT: Initial column setup - creates the starting point for the rain effect
      drops.current = Array(columnCount).fill(0);
      
      // EFFECT: Random speed initialization - each column falls at a different rate
      speeds.current = Array(columnCount).fill(0).map(() => 
        0.05 + Math.random() * 0.15);
      
      // EFFECT: Character initialization - each column gets a starting character
      charIndices.current = Array(columnCount).fill(0).map(() => 
        Math.floor(Math.random() * chars.length));
        
      // EFFECT: Glow variation - each column has a different glow intensity
      glowIntensity.current = Array(columnCount).fill(0).map(() => 
        Math.random() * 0.5);
    };

    // EFFECT: Performance optimization - only animate when visible in viewport
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      if (!ctx || !canvas || !isVisible) return;

      // EFFECT: Trail effect - creates fading trails as characters fall
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}rem monospace`;

      // EFFECT: Viewport optimization - only render columns that are visible
      // to improve performance on larger screens
      const viewportWidth = window.innerWidth;
      const columnWidth = fontSize * 16; // Width of each character column
      const visibleColumnStart = Math.max(0, Math.floor(window.scrollX / columnWidth) - 5);
      const visibleColumnEnd = Math.min(
        drops.current.length, 
        Math.ceil((window.scrollX + viewportWidth) / columnWidth) + 5
      );
      
      // Only render columns that are in or near the viewport
      for (let i = visibleColumnStart; i < visibleColumnEnd; i++) {
        // EFFECT: Character mutation - occasionally change characters for a dynamic look
        if (Math.random() > 0.9) {
          charIndices.current[i] = Math.floor(Math.random() * chars.length);
        }
        
        const text = chars[charIndices.current[i]];
        const x = i * columnWidth;
        const y = drops.current[i] * columnWidth;
        
        // EFFECT: Glow effect - adds a neon glow to characters
        ctx.shadowBlur = 5 + glowIntensity.current[i] * 5;
        ctx.shadowColor = 'rgba(0, 255, 157, 0.5)';
        
        // EFFECT: Depth simulation - creates a pseudo-3D effect with varying opacity
        const depth = 0.3 + Math.sin(i * 0.1 + Date.now() * 0.001) * 0.2 + 0.5;
        
        // EFFECT: Highlight characters - some characters shine brighter for visual interest
        if (Math.random() > 0.98) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          // Intensify glow for highlighted characters
          ctx.shadowBlur = 10;
        } else {
          // EFFECT: Color randomization - slightly vary character colors
          const colorVariation = colorVariations[Math.floor(Math.random() * colorVariations.length)];
          const brightness = 0.5 + Math.random() * 0.5;
          ctx.fillStyle = `rgba(${colorVariation.r}, ${colorVariation.g}, ${colorVariation.b}, ${brightness * depth})`;
        }

        ctx.fillText(text, x, y);
        
        // Reset shadow for next operations
        ctx.shadowBlur = 0;

        // EFFECT: Column reset - determines when columns restart from the top
        if (y > canvas.height) {
          if (Math.random() > 0.98) {
            drops.current[i] = 0;
            // EFFECT: Speed variation on reset - columns change speed when restarting
            speeds.current[i] = 0.05 + Math.random() * 0.15;
            // EFFECT: Glow variation on reset - columns change glow intensity when restarting
            glowIntensity.current[i] = Math.random() * 0.5;
          }
        }
        
        // EFFECT: Oscillating speeds - adds subtle wave-like motion to falling characters
        drops.current[i] += speeds.current[i] * (0.9 + Math.sin(Date.now() * 0.0005 + i) * 0.1);
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    
    // EFFECT: Cleanup - ensures proper resource management when component unmounts
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