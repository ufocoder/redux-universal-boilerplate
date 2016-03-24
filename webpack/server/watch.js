var _ = require('lodash');
var webpack = require('webpack');
var webpackNodeExternals = require('webpack-node-externals');
var config = require('./config');
var wds = {
  hostname: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || 8080
};

config.entry.unshift(
  'webpack/hot/poll?1000'
);

module.exports = _.mergeWith(config, {
  cache: true,
  debug: true,
  watch: true,
  output: {
    publicPath: 'http://' + wds.hostname + ':' + wds.port + '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  externals: [
    webpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ]
}, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
