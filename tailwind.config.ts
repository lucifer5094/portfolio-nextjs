import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom Colors
      colors: {
        primary: {
          DEFAULT: "#00FF9D", // Neon Green
          dark: "#00CC7D",
        },
        secondary: {
          DEFAULT: "#6D28D9", // Purple
          dark: "#5B21B6",
        },
        background: {
          dark: "#0A0A0A", // Dark Background
          terminal: "#050505", // Terminal background
          card: "rgba(0, 0, 0, 0.6)", // Card background with transparency
          overlay: "rgba(10, 10, 10, 0.8)", // Overlay background
        },
        text: {
          dark: "#E5E7EB", // Light Text for Dark Mode
        },
      },
      // Custom Animations
      animation: {
        "neon-pulse": "neon-pulse 2s infinite",
        "text-glitch": "text-glitch 2s infinite",
        "matrix-rain": "matrix-rain 5s linear infinite",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": { opacity: "1", textShadow: "0 0 10px #00FF9D, 0 0 20px #00FF9D, 0 0 30px #00FF9D" },
          "50%": { opacity: "0.7", textShadow: "0 0 5px #00FF9D, 0 0 10px #00FF9D, 0 0 15px #00FF9D" },
        },
        "text-glitch": {
          "0%": { transform: "translate(0)" },
          "25%": { transform: "translate(-2px, 2px)" },
          "50%": { transform: "translate(2px, -2px)" },
          "75%": { transform: "translate(-2px, 2px)" },
          "100%": { transform: "translate(0)" },
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      // Custom Fonts
      fontFamily: {
        mono: ["Source Code Pro", "monospace"], // Hacker-style font
      },
      // Custom Shadows
      boxShadow: {
        neon: "0 0 10px rgba(0, 255, 157, 0.5), 0 0 20px rgba(0, 255, 157, 0.3)",
        "neon-lg": "0 0 20px rgba(0, 255, 157, 0.7), 0 0 40px rgba(0, 255, 157, 0.5)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // For blog content styling
    require("tailwindcss-animate"), // For animations
  ],
};

export default config;