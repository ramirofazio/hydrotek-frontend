import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import { backgrounds, defaultPost } from "./src/assets/index";

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
        circuit: `url(${backgrounds.circuit})`,
        blueGradient: `url(${backgrounds.blueGradient})`,
        productBorderGradient: `url(${backgrounds.productBorderGradient})`,
        productBorderNoGradient: `url(${backgrounds.productBorder})`,
        cartProductBorder: `url(${backgrounds.cartProductBorder})`,
        signUpXl:`url(${backgrounds.signUpBgXl})`,
        defaultPost: `url(${defaultPost})`,
        "gold-gradient": "linear-gradient(90deg, #dcc361 -7.41%, #b8912d 113.89%)",
      },
      screens: {
        xs: "375px",
        s: "450px",
        ...defaultTheme,
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};
