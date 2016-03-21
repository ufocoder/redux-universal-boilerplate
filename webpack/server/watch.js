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

module.exports = _.merge(config, {
  cache: true,
  debug: true,
  output: {
    publicPath: 'http://' + wds.hostname + ':' + wds.port + '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __DEV__: process.env.NODE_ENV !== 'production'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  externals: [
    webpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ]
});
