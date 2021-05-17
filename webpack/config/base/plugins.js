const cleanPlugins = require('./plugins/clean');
const happypackPlugins = require('./plugins/happypack');
const htmlPlugins = require('./plugins/html');
const definePlugins = require('./plugins/define');
const miniCssPlugins = require('./plugins/miniCss');
const copyPlugins = require('./plugins/copy');
const hotReloadPlugins = require('./plugins/hotReload');
const bundleAnalyzerPlugins = require('./plugins/bundleAnalyzer');
const duplicatePlugins = require('./plugins/duplicate');
const forkTsCheckerPlugins = require('./plugins/forkTsChecker');
const hardSourcePlugins = require('./plugins/hardSource');

module.exports = [
  ...cleanPlugins,
  ...happypackPlugins,
  ...htmlPlugins,
  ...definePlugins,
  ...miniCssPlugins,
  ...copyPlugins,
  ...hotReloadPlugins,
  ...bundleAnalyzerPlugins,
  ...duplicatePlugins,
  ...forkTsCheckerPlugins,
  ...hardSourcePlugins
];
