function getConfig() {
  if (process.env.PROJECT_ENV === 'production') {
    return require('./prod');
  }

  return require('./base');
}

module.exports = getConfig();
