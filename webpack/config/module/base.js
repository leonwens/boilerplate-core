const baseConfig = require('../base');

/** runtimeChunk 和 splitChunks 会导致 export 变为 undefined */
delete baseConfig.optimization.runtimeChunk;
delete baseConfig.optimization.splitChunks;

module.exports = baseConfig;
