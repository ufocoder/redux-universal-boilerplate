const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const appPath = path.join(__dirname, '..', '..');

const wds = {
  hostname: process.env.WATCH_HOSTNAME || 'localhost',
  port: process.env.WATCH_PORT || 8080,
};
const proxy = {
  hostname: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || 8000,
};

config.entry.unshift(
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://' + wds.hostname + ':' + wds.port,
  'webpack/hot/only-dev-server'
);

config.devServer = {
  publicPath: '/assets/',
  contentBase: path.resolve(path.join(appPath, 'static')),
  hot: true,
  inline: false,
  lazy: false,
  quiet: true,
  noInfo: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  proxy: {
    '**': 'http://' + proxy.hostname + ':' + proxy.port,
  },
  stats: {
    colors: true,
  },
  host: wds.hostname,
  port: wds.port,
};

module.exports = _.mergeWith(config, {
  cache: true,
  devtool: 'source-map',
  output: {
    filename: 'client.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
