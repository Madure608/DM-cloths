/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#2c2b2a",
        cream: "#f7f3ec",
        blush: "#f1d7c8",
        rose: "#cfe6f7",
        taupe: "#9aa2ab",
        cloud: "#ffffff",
        ink: "#2c2b2a",
        sand: "#f7f3ec",
        clay: "#7b8fa3",
        ember: "#f2c86b",
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
