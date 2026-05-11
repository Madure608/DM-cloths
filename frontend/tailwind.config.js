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
      },
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        body: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
};
