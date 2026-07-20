import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
     primary: "#0F172A",
     surface: "#1B2436",
     accent: "#D7F32C", 
    success: "#10B981",
    neutral: "#212B42",
   },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;