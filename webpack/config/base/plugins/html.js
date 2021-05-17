const { resolve } = require('path');
const { existsSync } = require('fs');
const paths = require('../../../../utils/paths');
const { boilerplateType } = require(paths.package);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entry = require('../entry');

const appEjsPath = './src/app/index.ejs';
const boilerplateEjsPath = boilerplateType !== 'mobile' ? './node_modules/@yitu/boilerplate-core/ejs/index.ejs' : './node_modules/@yitu/boilerplate-core/ejs/index-mobile.ejs';
const defaultEjsPath = existsSync(appEjsPath) ? appEjsPath : boilerplateEjsPath;

const minifyOptions = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
};
const htmlWebpackPlugins = Object.keys(entry).map(name => {
  const subEjsPath = resolve(entry[name], './index.ejs');
  const subEjsExists = existsSync(subEjsPath);
  return new HtmlWebpackPlugin({
    template: subEjsExists ? subEjsPath : defaultEjsPath,
    filename: `${name === 'app' ? 'index' : name}.html`,
    chunks: [name, '_vendor'],
    env: process.env.PROJECT_ENV,
    minify: process.env.PROJECT_ENV === 'production' ? minifyOptions : false
  });
});

module.exports = htmlWebpackPlugins;
