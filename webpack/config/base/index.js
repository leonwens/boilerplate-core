const entry = require('./entry');
const moduleOptions = require('./module');
const resolve = require('./resolve');
const output = require('./output');
const plugins = require('./plugins');
const optimization = require('./optimization');
const performance = require('./performance');
const stats = require('./stats');
const devServer = require('./devServer');
const paths = require('../../../utils/paths');
const projectConfig = require(paths.config);

const isProd = process.env.PROJECT_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd
    ? projectConfig.sourceMap
      ? 'cheap-module-source-map'
      : false
    : 'cheap-module-eval-source-map',
  entry,
  module: moduleOptions,
  resolve,
  output,
  plugins,
  optimization,
  performance,
  stats,
  devServer
};
