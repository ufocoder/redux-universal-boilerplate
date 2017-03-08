const _ = require('lodash');
const webpack = require('webpack');
const config = require('./config');

config.entry.push(
  'webpack/hot/poll?1000'
);

module.exports = _.mergeWith(config, {
  devtool: 'source-map',
  cache: true,
  watch: true,
  output: {
    hotUpdateMainFilename: 'update/[hash]/update.json',
    hotUpdateChunkFilename: 'update/[hash]/[id].update.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}, function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
