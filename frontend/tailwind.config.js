/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#2a2622",
        cream: "#f6efea",
        blush: "#f4c7c3",
        rose: "#e8a6a1",
        taupe: "#9a8f86",
        cloud: "#fff9f6",
        ink: "#1b1917",
        sand: "#f6efea",
        clay: "#9a8f86",
        ember: "#d46a5c",
      },
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        body: ["Sora", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
