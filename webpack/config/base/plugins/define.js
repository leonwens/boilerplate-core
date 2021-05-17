const webpack = require('webpack');

module.exports = [
  new webpack.DefinePlugin({
    ENV: JSON.stringify(process.env.PROJECT_ENV)
  })
];
