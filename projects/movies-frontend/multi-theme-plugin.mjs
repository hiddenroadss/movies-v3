import hexRgb from 'hex-rgb';
import plugin from 'tailwindcss/plugin.js';

function getRgbChannels(hex) {
  const { red, green, blue } = hexRgb(hex);
  return `${red} ${green} ${blue}`;
}

function getCssVariableDeclarations(input,path=[], output={}) {
  Object.entries(input).forEach(([key, value]) => {
    const newPath = path.concat(key);
    if (typeof value !== 'string') {
      getCssVariableDeclarations(value, newPath, output);
    } else {
      output[`--${newPath.join('-')}`] = getRgbChannels(value);
    }
  })
  return output;
}

function getColorsConfig(input, path=[]) {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => {
      const newPath = path.concat(key);
      if (typeof value !== 'string') {
       return [key,  getColorsConfig(value, newPath)]
      }
      return [key, `rgb(var(--${newPath.join('-')}) / <alpha-value>)`]
    })
  )
}

function checkForValidColorThemeInput(input) {
  const isValid = typeof input === 'object' && Object.keys(input).some(key => typeof input[key] === 'object')
  if(!isValid) {
    throw new Error('You have to provide colorThemes property with at least one color theme object inside options')
  }
}

export default plugin.withOptions(
  function (options) {
    checkForValidColorThemeInput(options.colorThemes);
    return function ({ addBase }) {
      addBase({
        ":root": getCssVariableDeclarations(Object.values(options.colorThemes)[0])
      });
  
      Object.entries(options.colorThemes).forEach(([key, value]) => {
        addBase({
          [`[data-theme="${key}"]`]: getCssVariableDeclarations(value)
        })
      })
    }
  },
  function(options) {
    checkForValidColorThemeInput(options.colorThemes);
    return {
      theme: {
        extend: {
          colors: getColorsConfig(Object.values(options.colorThemes)[0])
        },
      },
    }
  }
)