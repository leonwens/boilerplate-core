const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const forkTsCheckerPlugins = [];

if (process.env.PROJECT_ENV === 'development') {
  forkTsCheckerPlugins.push(
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    })
  );
}

module.exports = forkTsCheckerPlugins;
