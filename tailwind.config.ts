import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree Variable", "sans-serif"],
        serif: ["Playfair Display Variable", "serif"],
      },
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        white: "#fff",
        offwhite: "#f8f8f8",
        offwhite2: "#f9f9f9",
      },
      // Define animation class
      animation: {
        "ltr-linear-infinite": "move-bg 3s linear infinite",
      },
      // Define keyframes
      keyframes: {
        "move-bg": {
          "0%": { "background-position": "0 0" },
          "50%": { "background-position": "1000px 0" },
          "100%": { "background-position": "0 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
