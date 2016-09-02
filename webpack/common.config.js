var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic.config'));

module.exports = {
  cache: false,
  debug: false,
  context: __dirname,
  stats: {
    colors: true,
    hasErrors: true,
    hasWarnings: true,
    reasons: true,
    errorDetails: true
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js'],
    alias: {
      src: path.join(path.dirname(__dirname), 'src')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react']
        },
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url?limit=10240&name=assets/img/[hash].[ext]'
      }
    ],
    noParse: /\.min\.js/
  },
  output: {
    publicPath: '/assets/'
  },
  node: {
    __dirname: true,
    fs: 'empty'
  }
};
