const { cpus } = require('os');
const HappyPack = require('happypack');

const happypackPlugins = [];
const happyThreadPool = HappyPack.ThreadPool({ size: cpus().length });

happypackPlugins.push(
  new HappyPack({
    id: 'babel',
    threadPool: happyThreadPool,
    loaders: ['babel-loader?cacheDirectory']
  })
);

module.exports = happypackPlugins;
