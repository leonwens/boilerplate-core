const resolvePath = require('./resolvePath');

module.exports = {
  project: resolvePath('.'),
  dist: resolvePath('dist'),
  src: resolvePath('src'),
  package: resolvePath('package.json'),
  config: resolvePath('project.config.js'),
  contentBase: resolvePath('public'),
};
