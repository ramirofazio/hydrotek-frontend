import colors from "tailwindcss/colors";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#1B142C",
        gold: "#B8912D",
        blue: "#1a3c5a",
        white: colors.white,
        black: colors.black,
        gray: colors.gray,
      },
      fontFamily: {
        primary: ["Orbitron", "sans-serif"],
        secondary: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
