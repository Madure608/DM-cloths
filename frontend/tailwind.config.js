/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brandOrange: "#f85606",
        brandOrangeDark: "#e24b00",
        brandOrangeSoft: "#d7ecff",
        brandYellow: "#ffd166",
        brandBlue: "#1f4b99",
        ink: "#1b1b1b",
        slate: "#6b7280",
        mist: "#c6e2ff",
        cloud: "#ffffff",
        borderSoft: "#eef2f7",
        charcoal: "#2c2b2a",
        cream: "#eaf3ff",
        blush: "#f1d7c8",
        rose: "#cfe6f7",
        taupe: "#9aa2ab",
        sand: "#eaf3ff",
        clay: "#7b8fa3",
        ember: "#f2c86b",
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        body: ["Manrope", "sans-serif"],
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
