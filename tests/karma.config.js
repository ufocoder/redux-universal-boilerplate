module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    browsers: ['PhantomJS'],
    plugins: [
        'karma-mocha',
        'karma-phantomjs-launcher',
        'karma-sourcemap-loader',
        require('karma-webpack')
    ],
    reporters: ['dots'],
    preprocessors: {
        'entry.js': ['webpack', 'sourcemap']
    },
    webpack: require('../webpack/tests.config'),
    webpackServer: {
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000
        },
        stats: {
            colors: true
        },
        noInfo: true
    },
    files: [
        'entry.js'
    ]
  });
};
