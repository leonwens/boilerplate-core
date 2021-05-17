const paths = require('../../../utils/paths');
const { peerDependencies } = require(paths.package);

const externals = {};

if (peerDependencies) {
  const keys = Object.keys(peerDependencies);

  keys.forEach(key => {
    externals[key] = key;
  });
}

module.exports = externals;
