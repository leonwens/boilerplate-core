const paths = require('../../../../utils/paths');
const projectConfig = require(paths.config);
const miniCssPlugins = [];

if (projectConfig.extractCss) {
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  miniCssPlugins.push(
    new MiniCssExtractPlugin({
      filename: projectConfig.hash ? '[name]/index.[hash].css' : '[name]/index.css',
      chunkFilename: projectConfig.hash ? '[name]/index.[hash].css' : '[name]/index.css'
    })
  );
}

module.exports = miniCssPlugins;
