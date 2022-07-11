const autoprefixer = require("autoprefixer");
const postcssNesting = require("postcss-nesting");
const postcssDarkThemeClass = require("postcss-dark-theme-class");

module.exports = {
  plugins: [autoprefixer, postcssNesting, postcssDarkThemeClass]
};
