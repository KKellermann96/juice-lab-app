/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      engineering: {
        100: "#F7F7F7",
        200: "#EEEDED",
        300: "#BFBBBB",
        400: "#8D8786",
        500: "#575352",
        600: "#3C3A39",
      },
      ocean: {
        100: "#DFF4F3",
        200: "#B8DEDA",
        300: "#6CB4AD",
        400: "#3B9B91",
        500: "#0A8276",
        600: "#08665C",
        700: "#06534B",
      },
      green: {
        500: "#4CA460",
      },
      red: {
        500: "#CD002F",
        600: "#BF0023",
        700: "#900021",
      },
      orange: {
        500: "#E16B25",
      },
      black: "#1D1D1D",
      white: "#FFFFFF",
      transparent: "rgba(0, 0, 0, 0)",
      berry: {
        500: "#9C216E",
        400: "#BE3283",
      },
      lawn: {
        400: "#B9D257",
        500: "#9BBA43",
        600: "#3C6C0F",
      },
      sun: {
        400: "#FF9737",
        500: "#F97414",
      },
      sand: {
        400: "#FBE273",
        500: "#FCD442",
      },
    },
    spacing: {
      0: "0",
      1: ".25rem",
      2: ".5rem",
      3: "1rem",
      4: "1.5rem",
      5: "3rem",
    },
    fontSize: {
      base: ["1rem", "1.5"],
      h6: ["1.125rem", { lineHeight: "1.555", fontWeight: 600 }],
      h5: ["1.25rem", { lineHeight: "1.4", fontWeight: 600 }],
      h4: ["1.5rem", { lineHeight: "1.285", fontWeight: 600 }],
      h3: ["1.75rem", { lineHeight: "1.333", fontWeight: 600 }],
      h2: ["2.25rem", { lineHeight: "1.222", fontWeight: 600 }],
      h1: ["2.75rem", { lineHeight: "1.272", fontWeight: 600 }],
      display3: ["3rem", { lineHeight: "1.25", fontWeight: 600 }],
      display2: ["3.5rem", { lineHeight: "1.142", fontWeight: 600 }],
      display1: ["4.25rem", { lineHeight: "1.117", fontWeight: 600 }],
      body6: ["0.625rem", "1.6"],
      body5: ["0.75rem", "1.333"],
      body4: ["0.875rem", "1.25rem"],
      body3: ["1rem", "1.5"],
      body2: ["1.125rem", "1.555"],
      body1: ["1.375rem", "2"],
      eyebrow3: ["0.625rem", { lineHeight: "1.4", letterSpacing: ".125rem" }],
      eyebrow2: ["0.875rem", { lineHeight: "1.5", letterSpacing: ".125rem" }],
      eyebrow1: ["1rem", { lineHeight: "1.5", letterSpacing: ".125rem" }],
    },
    fontWeight: {
      normal: "400",
      "semi-bold": "600",
    },
    screens: {
      xs: "375px",
      sm: "720px",
      md: "1024px",
      lg: "1200px",
      xl: "1440px",
    },
    borderRadius: {
      none: "0",
      DEFAULT: "1px",
      full: "9999px",
    },
  },
  plugins: [],
}

