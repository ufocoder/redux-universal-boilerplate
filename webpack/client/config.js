/* eslint max-len: [2, 120, 4] */

var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var config = require('../common.config');

var appPath = path.join(__dirname, '..', '..');

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../isomorphic.config'));

module.exports = _.merge(config, {
  target: 'web',
  devtool: false,
  entry: [
    path.resolve(path.join(appPath, 'src', 'client'))
  ],
  output: {
    path: path.resolve(path.join(appPath, 'static')),
    filename: 'dist/client.js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('styles'),
        loaders: ['css']
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url?limit=10240'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
        loader: 'file'
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
    noParse: /\.min\.js/
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __DEV__: process.env.NODE_ENV !== 'production'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    webpackIsomorphicToolsPlugin
  ]
});
