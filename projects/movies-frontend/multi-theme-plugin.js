const plugin = require('tailwindcss/plugin');
const hexRgb = require('hex-rgb');

function getRgbChannels(hex) {
  const { red, green, blue } = hexRgb(hex);
  return `${red} ${green} ${blue}`;
}

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

module.exports = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        "--primary-100": getRgbChannels(themes.base['100']),
        "--primary-200": getRgbChannels(themes.base['200']),
        "--primary-300": getRgbChannels(themes.base['300']),
        "--primary-400": getRgbChannels(themes.base['400']),
        "--primary-500": getRgbChannels(themes.base['500']),
        "--primary-600": getRgbChannels(themes.base['600']),
        "--primary-700": getRgbChannels(themes.base['700']),
        "--primary-800": getRgbChannels(themes.base['800']),
        "--primary-900": getRgbChannels(themes.base['900']),
      }
    });

    Object.entries(themes).forEach(([key, value]) => {
      addBase({
        [`[data-theme="${key}"]`]: {
          "--primary-100": getRgbChannels(value['100']),
          "--primary-200": getRgbChannels(value['200']),
          "--primary-300": getRgbChannels(value['300']),
          "--primary-400": getRgbChannels(value['400']),
          "--primary-500": getRgbChannels(value['500']),
          "--primary-600": getRgbChannels(value['600']),
          "--primary-700": getRgbChannels(value['700']),
          "--primary-800": getRgbChannels(value['800']),
          "--primary-900": getRgbChannels(value['900']),
        }
      })
    })
  },
  {
    theme: {
      extend: {
        colors: {
          primary: {
            100: 'rgb(var(--primary-100) / <alpha-value>)',
            200: 'rgb(var(--primary-200) / <alpha-value>)',
            300: 'rgb(var(--primary-300) / <alpha-value>)',
            400: 'rgb(var(--primary-400) / <alpha-value>)',
            500: 'rgb(var(--primary-500) / <alpha-value>)',
            600: 'rgb(var(--primary-600) / <alpha-value>)',
            700: 'rgb(var(--primary-700) / <alpha-value>)',
            800: 'rgb(var(--primary-800) / <alpha-value>)',
            900: 'rgb(var(--primary-900) / <alpha-value>)'
          }
        }
      },
    },
  }
)