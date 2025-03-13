'use client';
import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render component after it's mounted on the client
  useEffect(() => {
    setMounted(true); 
  }, []);

  if (!mounted) return null; 

  return (
    <button
      onClick={toggleTheme}
      className={`
        fixed bottom-5 left-5 z-50
        p-3 rounded-full
        font-mono text-sm
        transition-all duration-300 ease-in-out
        ${isDark ? 
          "bg-gray-900 border-emerald-400 text-emerald-400 animate-neon-pulse shadow-neon" : 
          "bg-white border-secondary text-secondary hover:shadow-neon-lg"
        }
        border-2 hover:scale-105
      `}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <div className="flex items-center gap-2">
          <span className="text-xl">🌙</span>
          <span className="hidden sm:inline">DARK_SYS</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-xl">🌞</span>
          <span className="hidden sm:inline">LIGHT_SYS</span>
        </div>
      )}
    </button>
  );
}