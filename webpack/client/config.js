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

const rules = [
  {
    test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
    loader: 'file-loader',
    options: {
      name: 'fonts/[hash].[ext]',
    },
  },
];

if (prodMode) {
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  plugins.push(new ExtractTextPlugin('styles.css'));
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }));

  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }));

  rules.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesCss'),
    use: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css-loader',
    }),
  });

  rules.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesSass'),
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css-loader!sass-loader',
    }),
  });

  rules.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesStyl'),
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css-loader!stylus-loader',
    }),
  });
} else {
  rules.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesCss'),
    loader: 'style-loader!css-loader',
  });

  rules.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesSass'),
    loader: 'style-loader!css-loader!sass-loader',
  });

  rules.push({
    test: webpackIsomorphicToolsPlugin.regular_expression('stylesStyl'),
    loader: 'style-loader!css-loader!stylus-loader',
  });
}

plugins.push(new webpack.LoaderOptionsPlugin({
  debug: true,
}));

plugins.push(new webpack.NamedModulesPlugin());

module.exports = _.mergeWith(config, {
  target: 'web',
  devtool: devMode ? 'source-map' : null,
  module: {
    rules: rules,
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
