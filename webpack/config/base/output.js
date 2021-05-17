const paths = require('../../../utils/paths');
const projectConfig = require(paths.config);

module.exports = {
  path: paths.dist,
  publicPath: process.env.PROJECT_ENV === 'development' ? '/' : './',
  filename: projectConfig.hash ? '[name]/index.[hash].js' : '[name]/index.js',
  chunkFilename: projectConfig.hash ? '[name]/index.[hash].js' : '[name]/index.js',
};
