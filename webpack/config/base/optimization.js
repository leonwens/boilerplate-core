const paths = require('../../../utils/paths');
const projectConfig = require(paths.config);

const optimization = {};

if (projectConfig.splitChunks) {
  optimization.runtimeChunk = {
    name: '_vendor'
  };

  optimization.splitChunks = {
    cacheGroups: {
      commons: {
        name: '_vendor',
        chunks: 'initial',
        minChunks: 2
      }
    }
  };
}

if (process.env.PROJECT_ENV === 'prod') {
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

  optimization.minimize = true;
  optimization.minimizer = [new OptimizeCSSAssetsPlugin({})];
}

module.exports = optimization;
