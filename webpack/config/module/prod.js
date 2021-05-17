const _ = require('lodash');
const baseConfig = require('./base');
const merge = require('../../merge');
const paths = require('../../../utils/paths');
const projectConfig = require(paths.config);
const { exportModuleOnly } = projectConfig;
const { name } = require(paths.package);
const externals = require('./externals');

if (exportModuleOnly) {
  baseConfig.entry = {};
  _.remove(baseConfig.plugins, plugin => plugin.constructor.name === 'HtmlWebpackPlugin');
}

baseConfig.entry.module = './src/module';
baseConfig.externals = { ...baseConfig.externals, ...externals };

const config = merge(baseConfig, {
  output: {
    library: name,
    libraryTarget: 'umd'
  }
});

module.exports = config;
