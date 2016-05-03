var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var config = require('../common.config');

var appPath = path.join(__dirname, '..', '..');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../isomorphic.config'));

var devMode = process.env.NODE_ENV !== 'production';
var prodMode = process.env.NODE_ENV === 'production';

var plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __PRODUCTION__: prodMode,
    __DEV__: devMode
  })
];

if (prodMode) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

plugins.push(webpackIsomorphicToolsPlugin);

module.exports = _.mergeWith(config, {
  target: 'web',
  devtool: false,
  entry: [
    path.resolve(path.join(appPath, 'src', 'client'))
  ],
  output: {
    path: path.resolve(path.join(appPath, 'static')),
    filename: 'assets/client.js',
    chunkFilename: '[name].[id].js'
  },
  plugins: plugins
}, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
