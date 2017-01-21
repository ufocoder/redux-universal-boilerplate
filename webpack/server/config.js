const fs = require('fs');
const _ = require('lodash');
const webpack = require('webpack');
const path = require('path');
const config = require('../common.config');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../isomorphic.config'));
const appPath = path.join(__dirname, '..', '..');
const prodMode = process.env.NODE_ENV === 'production';
const devMode = process.env.NODE_ENV !== 'production';

const nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
    __PRODUCTION__: prodMode,
    __DEV__: devMode,
  }),
];

const assetsIgnoredGroups = [
  'stylesCss',
  'stylesSass',
  'stylesStyl',
  'fonts',
];

/**
 * Add node noop
 * @param {[type]} regExpGroup [description]
 */
function addNodeNoop(regExpGroup) {
  plugins.push(new webpack.NormalModuleReplacementPlugin(
    webpackIsomorphicToolsPlugin.regular_expression(regExpGroup),
    'node-noop'
  ));
}

_.forEach(assetsIgnoredGroups, addNodeNoop);

if (prodMode) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }));

  plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
  }));

  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }));
} else {
  plugins.push(new webpack.LoaderOptionsPlugin({
    debug: true,
  }));
}

module.exports = _.mergeWith(config, {
  target: 'node',
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.resolve(path.join(appPath, 'src', 'server')),
  ],
  externals: nodeModules,
  output: {
    path: path.resolve(path.join(appPath, 'dist')),
    filename: 'server.js',
  },
  plugins: plugins,
}, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
