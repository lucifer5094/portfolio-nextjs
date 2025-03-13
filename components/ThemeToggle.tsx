'use client';
import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { Sparkles, Stars, Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return placeholder with same dimensions to prevent layout shift
    return <div className="w-10 h-10 rounded-full bg-transparent" />;
  }

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-full p-3 shadow-xl will-change-transform hover:shadow-lg transition-all duration-500 ease-out ${
        isDark 
          ? "bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-emerald-300 hover:shadow-emerald-500/30" 
          : "bg-gradient-to-br from-lime-400 via-green-400 to-emerald-500 text-green-900 hover:shadow-green-500/30"
      }`}
      style={{ 
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        backgroundSize: isHovered ? '200% 200%' : '100% 100%',
        backgroundPosition: isHovered ? 'right bottom' : 'left top',
        transition: 'all 0.5s ease-out',
      }}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <Sun 
              size={20} 
              strokeWidth={2.5} 
              className="animate-spin-slow text-lime-300"
            />
            <Sparkles 
              size={12} 
              className="absolute -top-1 -right-1 text-emerald-200 animate-pulse"
            />
          </div>
          <div className="hidden sm:flex overflow-hidden font-bold">
            {Array.from("Switch to Light").map((char, index) => (
              <span 
                key={index}
                className="animate-float"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '1s',
                  fontFamily: "'Comic Sans MS', 'Bangers', cursive",
                  textShadow: '0.5px 0.5px 0 #fff, -0.5px -0.5px 0 #fff',
                  letterSpacing: '0.5px'
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <Moon 
              size={20} 
              strokeWidth={2.5} 
              className="animate-pulse text-green-900"
            />
            <Stars 
              size={12} 
              className="absolute -top-1 -right-1 text-teal-800 animate-twinkle"
            />
          </div>
          <div className="hidden sm:flex overflow-hidden font-bold">
            {Array.from("Switch to Dark").map((char, index) => (
              <span 
                key={index}
                className="animate-float"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '1s',
                  fontFamily: "'Comic Sans MS', 'Bangers', cursive",
                  textShadow: '0.5px 0.5px 0 #000, -0.5px -0.5px 0 #000',
                  letterSpacing: '0.5px'
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>
      )}
    </button>
  );
}

// Add this to your global CSS file or create a style tag in your component
// with styled-jsx for these custom animations:
//
// @keyframes spin-slow {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }
// @keyframes float {
//   0% { transform: translateY(0px); opacity: 0.5; }
//   50% { transform: translateY(-5px); opacity: 1; }
//   100% { transform: translateY(0px); opacity: 0.5; }
// }
// @keyframes twinkle {
//   0% { opacity: 0.2; transform: scale(0.8); }
//   50% { opacity: 1; transform: scale(1.2); }
//   100% { opacity: 0.2; transform: scale(0.8); }
// }
// .animate-spin-slow { animation: spin-slow 8s linear infinite; }
// .animate-float { animation: float 3s ease-in-out infinite; }
// .animate-twinkle { animation: twinkle 1.5s ease-in-out infinite; }