const _ = require('lodash');
const webpack = require('webpack');
const path = require('path');
const config = require('../common.config');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../isomorphic.config'));
const appPath = path.join(__dirname, '..', '..');

const devMode = process.env.NODE_ENV !== 'production';
const prodMode = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __PRODUCTION__: prodMode,
    __DEV__: devMode,
  }),
  webpackIsomorphicToolsPlugin,
];

const loaders = [
  {
    test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
    loader: 'file?name=fonts/[hash].[ext]',
  },
];

if (prodMode) {
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  plugins.push(new ExtractTextPlugin('styles.css'));
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }));

  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }));

  loaders.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesCss'),
    loader: ExtractTextPlugin.extract('style', 'css'),
  });

  loaders.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesSass'),
    loader: ExtractTextPlugin.extract('style', 'css!sass'),
  });

  loaders.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesStyl'),
    loader: ExtractTextPlugin.extract('style', 'css!stylus'),
  });
} else {
  loaders.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesCss'),
    loader: 'style!css',
  });

  loaders.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesSass'),
    loader: 'style!css!sass',
  });

  loaders.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesStyl'),
    loader: 'style!css!stylus',
  });
}

module.exports = _.mergeWith(config, {
  target: 'web',
  devtool: devMode ? 'source-map' : null,
  module: {
    loaders: loaders,
  },
  entry: [
    'babel-polyfill',
    path.resolve(path.join(appPath, 'src', 'client')),
  ],
  output: {
    path: path.resolve(path.join(appPath, 'static', 'assets')),
    filename: 'client.js',
    chunkFilename: '[name].[id].js',
  },
  plugins: plugins,
}, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
