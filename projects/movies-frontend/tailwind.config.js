/** @type {import('tailwindcss').Config} */

const themes = {
  base: {
    100: "#F0F5F9",
    200: "#C2E0F5",
    300: "#94CCF3",
    400: "#65B9F1",
    500: "#36A6EF",
    600: "#2881B4",
    700: "#1B5C88",
    800: "#0D365C",
    900: "#000D33",
  },
  theme2: {
    100: "#F4F0FA",
    200: "#D7C2F1",
    300: "#BB94E9",
    400: "#9F65E0",
    500: "#8336D7",
    600: "#6A28A4",
    700: "#511972",
    800: "#391040",
    900: "#200926",
  },
  theme3: {
    100: "#F9F0F5",
    200: "#F5C2E0",
    300: "#F394CC",
    400: "#F165B9",
    500: "#EF36A6",
    600: "#B42881",
    700: "#881B5C",
    800: "#5C0D36",
    900: "#33000D",
  },
};

const multiThemePlugin = require('./multi-theme-plugin');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  plugins: [
    multiThemePlugin
  ],
}

