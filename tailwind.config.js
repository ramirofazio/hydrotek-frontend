import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

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
      backgroundImage: {
        circuit: "url('./src/assets/circuit.png')",
        productBorderGradient: "url('./src/assets/productBorderGradient.png')",
        productBorderNoGradient: "url('./src/assets/productBorderNoGradient.png')",
      },
      screens: {
        /* xs: "200px", //Celular
        sm: "350px", // Celular M/L
        md: "640px", // Tablet
        xl: "1024px", // Laptop
        "2xl": "1400px", // Desktop */
        xs: "450px",
        ...defaultTheme,
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};
