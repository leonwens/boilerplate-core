const CopyWebpackPlugin = require('copy-webpack-plugin');
const { existsSync } = require('fs');

const colaWadoDist = 'node_modules/@yitu/cola-wado/dist/';
const copyOptions = [{ from: 'lib/**/*' }];

if (existsSync(colaWadoDist)) {
  copyOptions.push(
    {
      from: `${colaWadoDist}cornerstoneWADOImageLoaderWebWorker.min.js`,
      to: 'lib/cornerstone'
    },
    {
      from: `${colaWadoDist}cornerstoneWADOImageLoaderWebWorker.min.js.map`,
      to: 'lib/cornerstone'
    }
  );
}

module.exports = [new CopyWebpackPlugin(copyOptions)];
