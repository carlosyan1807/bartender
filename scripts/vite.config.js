// const scssVariables = require('../src/renderer/themes/variables.json')
// import scssVariables from '../src/renderer/themes/variables.scss'
const { join } = require('path')
const { external } = require('../package.json')

/**
 * camelCase to kebab-case
 * @param {string} str
 */
const kebabize = str => {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
     ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
     : letter;
  }).join('');
}
// const scssData = Object.keys(scssVariables).map(i => `\$${kebabize(i)}: ${scssVariables[i]};`).join('\n')
// console.log(scssData)
/**
 * Vite shared config, assign alias and root dir
 * @type {import('vite').UserConfig}
 */
const config = {
  root: join(__dirname, '../src/renderer'),
  base: '', // has to set to empty string so the html assets path will be relative
  alias: {
    '/@shared/': join(__dirname, '../src/shared'),
    '/@/': join(__dirname, '../src/renderer'),
  },
  optimizeDeps: {
    exclude: external,
  },
  cssPreprocessOptions: {
    scss: {
      // additionalData: scssData
      additionalData: `@import "../src/renderer/themes/variables.scss";`
    },
    // less: {
    //   javascriptEnabled: true,
    // },
  },
}

module.exports = config
