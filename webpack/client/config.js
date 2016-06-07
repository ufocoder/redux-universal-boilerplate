var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var config = require('../common.config');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../isomorphic.config'));
var appPath = path.join(__dirname, '..', '..');

var devMode = process.env.NODE_ENV !== 'production';
var prodMode = process.env.NODE_ENV === 'production';

var plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __PRODUCTION__: prodMode,
    __DEV__: devMode
  }),
  webpackIsomorphicToolsPlugin
];

var loaders = [
  {
    test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
    loader: 'file?name=assets/fonts/[hash].[ext]'
  }
];

if (prodMode) {
  var ExtractTextPlugin = require("extract-text-webpack-plugin");

  plugins.push(new ExtractTextPlugin("assets/styles.css"));
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));

  plugins.push(new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
  }));

  loaders.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('styles'),
    loader: ExtractTextPlugin.extract('style', 'css')
  });
} else {
  loaders.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('styles'),
    loader: 'style!css'
  });
}

module.exports = _.mergeWith(config, {
  target: 'web',
  devtool: false,
  module: {
    loaders: loaders
  },
  entry: [
    path.resolve(path.join(appPath, 'src', 'client'))
  ],
  output: {
    path: path.resolve(path.join(appPath, 'static')),
    publicPath: '/',
    filename: 'assets/client.js',
    chunkFilename: '[name].[id].js'
  },
  plugins: plugins
}, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
