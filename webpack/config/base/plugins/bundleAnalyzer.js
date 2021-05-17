const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const bundleAnalyzerPlugins = [];
const shouldReport = process.argv.includes('--report');

if (process.env.PROJECT_ENV === 'production' && shouldReport) {
  bundleAnalyzerPlugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static'
  }));
}

module.exports = bundleAnalyzerPlugins;
