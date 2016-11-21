let _ = require('lodash');
let webpack = require('webpack');
let config = require('./config');

config.entry.push(
  'webpack/hot/poll?1000'
);

module.exports = _.mergeWith(config, {
  devtool: 'eval',
  cache: true,
  debug: true,
  watch: true,
  output: {
    hotUpdateMainFilename: 'update/[hash]/update.json',
    hotUpdateChunkFilename: 'update/[hash]/[id].update.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
}, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
