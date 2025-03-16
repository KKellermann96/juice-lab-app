/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss/types/config";

const tailwindConfig: Config = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      arcade: {
        100: "#1d2016",
        200: "#FFD700",
        300: "#C0C0C0",
        400: "#CD7F32",
      },
      purple: {
        100: "#EAD7F7",
        200: "#C88BDB",
        300: "#9B58B5",
        400: "#7A3E92",
        500: "#5B2C72",
      },
      green: {
        100: "#C8F0C2",
        200: "#7FCF6D",
        300: "#267A1F",
        400: "#1D5E18",
        500: "#144314",
      },
      turquoise: {
        100: "#548365",
      },
      yellow: {
        100: "#F8E2A3",
        200: "#F4C23D",
        300: "#F1A100",
        400: "#D17E00",
        500: "#B16400",
      },
      red: {
        100: "#F5A6A6",
        200: "#F06262",
        300: "#D84F4F",
        400: "#B93C3C",
        500: "#A02C2C",
      },
      blue: {
        100: "#A7D8F9",
        200: "#6AB4E7",
        300: "#3D91D3",
        400: "#267BB7",
        500: "#1C5D8E",
        600: "#0f172a",
        700: "#272e3f",
      },
      Mint: {
        100: "#D6E7E3",
        200: "#B6D7CF",
        300: "#9CC4BB",
        400: "#75A89D",
        500: "#4E8C81",
      },
      black: "#000000",
      white: "#FFFFFF",
      transparent: "rgba(0, 0, 0, 0)",
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
    extend: {
      fontFamily: {
        georgia: ["Georgia", "serif"],
        pixel: ['"Press Start 2P"', "cursive"],
      },
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
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
    },
  },
  plugins: [],
};

export default tailwindConfig;
