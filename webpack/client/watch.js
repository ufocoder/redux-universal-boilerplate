var _ = require('lodash');
var webpack = require("webpack");
var webpackNodeExternals = require('webpack-node-externals');
var config = require("./config");
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../isomorphic.config'));
var wds = {
  hostname: process.env.HOSTNAME || "localhost",
  port: process.env.PORT || 8080
};

config.entry.unshift(
  "webpack-dev-server/client?http://" + wds.hostname + ":" + wds.port,
  "webpack/hot/only-dev-server"
);

config.devServer = {
  publicPath: "http://" + wds.hostname + ":" + wds.port + "/",
  hot: true,
  inline: false,
  lazy: false,
  quiet: true,
  noInfo: true,
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  proxy: {
    '*': 'http://localhost:8000/'
  },
  stats: {
    colors: true
  },
  host: wds.hostname
};

module.exports = _.mergeWith(config, {
  cache: true,
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: config.devServer.publicPath,
    hotUpdateMainFilename: "update/[hash]/update.json",
    hotUpdateChunkFilename: "update/[hash]/[id].update.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  externals: [
    webpackNodeExternals({
      whitelist: ['webpack/hot/only-dev-server']
    })
  ]
}, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
