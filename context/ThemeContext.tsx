'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

type ThemeContextType = {
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { setTheme } = useNextTheme();
  
  // Always set theme to dark on mount
  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{
      isDark: true,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);