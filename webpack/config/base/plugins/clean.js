const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const cleanPlugins = [];

if (process.env.PROJECT_ENV === 'production') {
  cleanPlugins.push(new CleanWebpackPlugin());
}

module.exports = cleanPlugins;
