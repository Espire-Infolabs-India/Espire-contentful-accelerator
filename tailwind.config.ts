import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",  // Scan pages for Tailwind classes
    "./components/**/*.{js,ts,jsx,tsx,mdx}",  // Scan components for Tailwind classes
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  // Scan app folder for Tailwind classes (for Next.js 13+)
  ],
  darkMode: 'class',  // Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      colors: {
        background: "var(--background)",  // Custom background color from CSS variables
        foreground: "var(--foreground)",  // Custom foreground color from CSS variables
      },
      fontFamily: {
        poppin: ['var(--font-Poppins)', "sans-serif"],  // Custom font family (ensure CSS var is defined)
      },
    },
  },
  plugins: [],
} satisfies Config;
