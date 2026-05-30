/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brandOrange: "#e31b23",
        brandOrangeDark: "#b3121b",
        brandOrangeSoft: "#fde8ea",
        brandYellow: "#ffd166",
        brandBlue: "#111111",
        ink: "#0f0f10",
        slate: "#6b7280",
        mist: "#f6f6f7",
        cloud: "#ffffff",
        borderSoft: "#ececec",
        charcoal: "#2c2b2a",
        cream: "#fff7f7",
        blush: "#f7e4e4",
        rose: "#ffe6e8",
        taupe: "#9aa2ab",
        sand: "#f7f7f8",
        clay: "#7b7f86",
        ember: "#f4c14d",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Work Sans", "sans-serif"],
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
