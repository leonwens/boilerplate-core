const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LessFunc = require('less-plugin-functions');
const { resolve } = require('path');
const paths = require('../../../utils/paths');
const projectConfig = require(paths.config);

const isProd = process.env.PROJECT_ENV === 'production';
const isTest = process.env.PROJECT_ENV === 'test';

const scriptRule = {
  test: /\.(j|t)sx?$/,
  exclude: [/node_modules/],
  use: ['happypack/loader?id=babel']
};

let styleLoader = 'style-loader';

if (isProd && projectConfig.extractCss) {
  styleLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  };
}

const styleRule = {
  test: /\.(css|less)$/,
  use: [
    styleLoader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: true,
        javascriptEnabled: true,
        plugins: [new LessFunc()]
      }
    }
  ]
};

const imageRule = {
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: projectConfig.hash ? 'img/[name].[hash].[ext]' : 'img/[name].[ext]',
        limit: 8192,
        fallback: 'file-loader'
      }
    }
  ]
};

const fontRule = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: projectConfig.hash ? 'font/[name].[hash].[ext]' : 'font/[name].[ext]',
        fallback: 'file-loader'
      }
    }
  ]
};

const sourceMapRule = {
  enforce: 'pre',
  test: /\.js$/,
  loader: 'source-map-loader',
  exclude: [/node_modules/]
};

const testReportRule = {
  test: /\.(j|t)sx?$/,
  use: {
    loader: 'istanbul-instrumenter-loader',
    options: { esModules: true }
  },
  enforce: 'post',
  include: resolve(paths.src, 'module')
};

const rules = [scriptRule, styleRule, imageRule, fontRule, sourceMapRule];

if (isTest) {
  rules.push(testReportRule);
}

module.exports = { rules };
