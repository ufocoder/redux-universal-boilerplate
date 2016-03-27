/* eslint max-len: [2, 120, 4] */

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');

var commonConfig = require('./common.config');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: commonConfig.module.loaders,
    noParse: [
      /\.min\.js/,
      /sinon/
    ]
  },
  resolve: {
    modulesDirectories: commonConfig.resolve.modulesDirectories,
    alias: {
      src: path.dirname(__dirname) + '/src/',
      sinon: 'sinon/pkg/sinon'
    }
  },
  plugins: commonConfig.plugins.concat([
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __DEV__: process.env.NODE_ENV !== 'production'
    })
  ]),
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
