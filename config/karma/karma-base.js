const path = require('path');
const webpackConfig = require('../webpack');

// Deleting output.library to avoid "Uncaught SyntaxError: Unexpected token /" error
// when running testes (var test/foo_test.js = ...)
delete webpackConfig.output.library;

// Karma will build the dependecy tree by itself
delete webpackConfig.entry;

// Code coverage
webpackConfig.module.rules.push({
  test: /\.js$/,
  include: path.resolve('./src/'),
  loader: 'istanbul-instrumenter-loader',
  query: {
    esModules: true
  }
});

module.exports = {
  basePath: '../../',
  frameworks: ['mocha'],
  reporters: ['progress', 'coverage'],
  files: [
    'test/**/*_test.js'
  ],

  plugins: [
    'karma-webpack',
    'karma-mocha',
    'karma-phantomjs-launcher',
    'karma-chrome-launcher',
    'karma-firefox-launcher',
    'karma-coverage'
  ],

  preprocessors: {
    'src/**/*.js': ['webpack'],
    'test/**/*_test.js': ['webpack']
  },

  webpack: webpackConfig,

  webpackMiddleware: {
    noInfo: false,
    stats: {
      chunks: false,
      timings: false,
      errorDetails: true
    }
  },

  sauceLabs: {
    startConnect: true,
    testName: 'Cornerstone WADO Image Loader'
  },

  coverageReporter: {
    dir: './coverage',
    reporters: [
      { type: 'html', subdir: 'html' },
      { type: 'lcov', subdir: '.' },
      { type: 'text', subdir: '.', file: 'text.txt' },
      { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
    ]
  }
};
