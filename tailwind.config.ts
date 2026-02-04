import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          50: "#f4f9e0",
          100: "#e6f2b3",
          200: "#d7eb80",
          300: "#c7e44d",
          400: "#bfff00", // Base neon green
          500: "#a9e600",
          600: "#8cb300",
          700: "#6a8c00",
          800: "#4d6600",
          900: "#334000",
        },
        dark: {
          pure: "#000000",
          surface: "#0a0a0a",
          card: "#111111",
          border: "#1f1f1f",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glow-mesh": "radial-gradient(circle at 50% 50%, rgba(191, 255, 0, 0.15) 0%, transparent 60%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      dropShadow: {
        "neon": "0 0 8px rgba(191, 255, 0, 0.5)",
      },
      boxShadow: {
        "neon": "0 0 20px rgba(191, 255, 0, 0.3)",
        "neon-hover": "0 0 30px rgba(191, 255, 0, 0.5)",
      }
    },
  },
  plugins: [],
};
export default config;
