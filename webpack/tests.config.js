var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json']
      },

      {
        test: /\.png$/,
        loader: 'url-loader?limit=10240'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react']
        },
        exclude: /node_modules/
      }
    ],
    noParse: [
      /\.min\.js/,
      /sinon/
    ]
  },
  resolve: {
      modulesDirectories: ['node_modules'],
      alias: {
          src: path.dirname(__dirname) + '/src/',
          sinon: 'sinon/pkg/sinon'
      }
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __DEV__: process.env.NODE_ENV !== 'production'
    })
  ],
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
