/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  prefix: "",
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "324px",
        xs: "425px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        light: {
          default: "#FAF7F7",
          variant: "#ffffff",
        },
        dark: {
          default: "#212B36",
          secondary: "#121212",
          shadow: "#00000075",
          variant: "#000000",
        },
        primary: {
          default: "#FF8383",
          variant: "#FFF574",
        },
        secondary: {
          default: "#A1D6CB",
          variant: "#A19AD3",
        },
        neutral: {
          primary: "#212B36",
          secondary: "#5E738A",
          800: "#333F4D",
          700: "#425263",
          600: "#516579",
          300: "#8D9DAE",
          200: "#ADB9C6",
          100: "#CCD5DE",
          50: "#F4F6F8",
        },
        error: {
          default: "#FF0000",
        },
        info: {
          default: "#1565D8",
          secondary: "#216BA5",
        },
      },
    },
  },
  daisyui: {
    themes: false,
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: false,
  },
  plugins: [require("daisyui")],
};
