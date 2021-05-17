const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const paths = require('../../../utils/paths');

module.exports = {
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
  modules: ['node_modules'],
  symlinks: false,
  alias: {
    '~': paths.src
  },
  plugins: [new TsconfigPathsPlugin()]
};
