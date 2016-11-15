let path = require('path');
let serverConfig = require('./server/config');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: serverConfig.module.loaders,
    noParse: [
      /\.min\.js/,
      /sinon/,
    ],
  },
  resolve: {
    modulesDirectories: serverConfig.resolve.modulesDirectories,
    alias: {
      src: path.dirname(__dirname) + '/src/',
      sinon: 'sinon/pkg/sinon',
    },
  },
  plugins: serverConfig.plugins,
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
