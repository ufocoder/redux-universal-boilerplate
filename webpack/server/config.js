let fs = require('fs');
let _ = require('lodash');
let webpack = require('webpack');
let path = require('path');
let config = require('../common.config');
let WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
let webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../isomorphic.config'));
let appPath = path.join(__dirname, '..', '..');
let prodMode = process.env.NODE_ENV === 'production';
let devMode = process.env.NODE_ENV !== 'production';

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

let plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
    __PRODUCTION__: prodMode,
    __DEV__: devMode,
  }),
];

let assetsIgnoredGroups = [
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

  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }));
}

module.exports = _.mergeWith(config, {
  target: 'node',
  devtool: 'source-map',
  entry: [
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
