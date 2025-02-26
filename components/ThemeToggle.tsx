'use client';
// import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 
  }, []);

  if (!mounted) return null; 

  return (
    <div></div>
    // <button
    //   onClick={() => {
    //     console.log("Theme toggled. isDark:", !isDark); // Debugging
    //     toggleTheme();
    //   }}
    //   className="fixed bottom-5  rounded-full border theme-toggle-btn  transition duration-300"
    // >
    //   {isDark ? "🌙 Dark Mode" : "🌞 Light Mode"}
    // </button>
  );
}