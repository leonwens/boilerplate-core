const merge = require('./merge');
const paths = require('../utils/paths');
const { boilerplateType } = require(paths.package);

module.exports = function (extraConfig = {}) {
  let baseConfig;

  if (boilerplateType === 'module') {
    baseConfig = require('./config/module');
  } else if (boilerplateType === 'mobile') {
    baseConfig = require('./config/mobile');
  } else {
    baseConfig = require('./config/base');
  }

  const result = merge(baseConfig, extraConfig);

  return result;
};
