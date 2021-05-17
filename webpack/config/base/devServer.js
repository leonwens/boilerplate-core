require('colors');
const portFinderSync = require('portfinder-sync');
const paths = require('../../../utils/paths');
const { proxy } = require(paths.package);
const projectConfig = require(paths.config);

let devServer = {};

if (process.env.PROJECT_ENV === 'development') {
  const basePort = parseInt(projectConfig.port, 10) || 3000;
  const openPort = portFinderSync.getPort(basePort);

  if (basePort !== openPort) {
    console.log(`☆ ${basePort} 端口被占用，开启新端口 ${openPort} ☆`.blue);
  }

  devServer = {
    hot: true,
    noInfo: true,
    open: true,
    host: '0.0.0.0',
    useLocalIp: true,
    port: openPort,
    contentBase: paths.contentBase,
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }]
    },
    proxy
  };
}

module.exports = devServer;
