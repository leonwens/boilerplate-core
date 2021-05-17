const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const duplicatePlugins = [];

if (process.env.PROJECT_ENV === 'production') {
  duplicatePlugins.push(new DuplicatePackageCheckerPlugin());
}

module.exports = duplicatePlugins;
