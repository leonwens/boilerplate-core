const webpack = require('webpack');
const hotReloadPlugins = [];

if (process.env.PROJECT_ENV === 'development') {
  hotReloadPlugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = hotReloadPlugins;
