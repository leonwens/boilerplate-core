const merge = require('deepmerge');

function getConfig(extraConfig = {}) {
  const baseConfig = require('./base');

  return merge(baseConfig, extraConfig);
}

module.exports = { getConfig };
