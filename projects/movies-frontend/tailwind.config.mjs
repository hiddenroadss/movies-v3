/** @type {import('tailwindcss').Config} */
import multiThemePlugin from "./multi-theme-plugin.mjs";
import themes from './themes.json' assert { type: "json" };


export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  plugins: [
    multiThemePlugin({colorThemes: themes})
  ],
}

