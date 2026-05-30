/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brandOrange: "#e06a5e",
        brandOrangeDark: "#c4564c",
        brandOrangeSoft: "#fdebe8",
        brandYellow: "#f6c36a",
        brandBlue: "#2a2a2a",
        ink: "#1f1f1f",
        slate: "#6d6a67",
        mist: "#f8f3ef",
        cloud: "#ffffff",
        borderSoft: "#e7e1dc",
        charcoal: "#2c2b2a",
        cream: "#fff8f2",
        blush: "#f8e1dc",
        rose: "#fbe9e6",
        taupe: "#9b9087",
        sand: "#f4eee9",
        clay: "#7a6f66",
        ember: "#f0b356",
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
