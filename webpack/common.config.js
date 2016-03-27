/* eslint max-len: [2, 120, 4] */

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic.config'));

module.exports = {
  cache: false,
  debug: false,
  context: __dirname,
  output: {
    publicPath: '/'
  },
  stats: {
    colors: true,
    hasErrors: true,
    hasWarnings: true
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
      'static'
    ],
    extensions: ['', '.json', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('styles'),
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url?limit=10240&name=assets/img/[hash].[ext]'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
        loader: 'file?name=assets/fonts/[hash].[ext]'
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
    new ExtractTextPlugin("assets/styles.css")
  ],
  node: {
    __dirname: true,
    fs: 'empty'
  }
};
