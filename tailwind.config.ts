import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#f5f0e8",
          50: "#faf8f3",
          100: "#f5f0e8",
          200: "#ece4d4",
          300: "#ddd1b8",
          400: "#c5b89a",
        },
        forest: {
          DEFAULT: "#1a3a2a",
          50: "#f0f7f3",
          100: "#dceee3",
          200: "#b8ddc7",
          300: "#7fc49e",
          400: "#4aab76",
          500: "#2d8f5c",
          600: "#1f7349",
          700: "#1a5c3c",
          800: "#1a3a2a",
          900: "#132b1f",
        },
        lavender: {
          DEFAULT: "#c4b5fd",
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
        },
        tangerine: "#f59e0b",
        gain: "#1a7a4c",
        loss: "#c53030",
        "gain-light": "#dcfce7",
        "loss-light": "#fef2f2",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "ticker-scroll": "ticker-scroll 40s linear infinite",
      },
      keyframes: {
        "ticker-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
