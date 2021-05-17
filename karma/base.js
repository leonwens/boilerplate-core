const isWatch = process.argv.includes('--watch');

module.exports = {
  frameworks: ['mocha', 'sinon-chai'],
  files: [{ pattern: 'test/**/*.spec.js?(x)' }],
  preprocessors: {
    './test/**/*.spec.js?(x)': ['webpack', 'sourcemap']
  },
  reporters: ['mocha', 'coverage-istanbul'],
  autoWatch: isWatch,
  browsers: ['Chrome'],
  singleRun: !isWatch,
  mochaReporter: {
    colors: {
      success: 'greenBright',
      info: 'cyanBright',
      warning: 'yellowBright',
      error: 'redBright'
    }
  },
  coverageIstanbulReporter: {
    reports: ['text'],
    fixWebpackSourcePaths: true
  },
  client: {
    chai: {
      includeStack: true
    }
  },
  failOnEmptyTestSuite: false
};
