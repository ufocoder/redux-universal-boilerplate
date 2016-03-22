/* eslint max-len: [2, 120, 4] */

var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var config = require('../common.config');

var appPath = path.join(__dirname, '..', '..');

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../isomorphic.config'));

module.exports = _.mergeWith(config, {
  target: 'node',
  devtool: 'source-map',
  entry: [
    path.resolve(path.join(appPath, 'src', 'server'))
  ],
  output: {
    path: path.resolve(path.join(appPath, 'dist')),
    filename: 'server.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __DEV__: process.env.NODE_ENV !== 'production'
    })
  ]
}, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
