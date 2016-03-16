var webpack = require('webpack');

module.exports = {
  cache: false,
  debug: false,
  context: __dirname,
  output: {
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
      'static'
    ],
    extensions: ['', '.json', '.js']
  },
  node: {
    __dirname: true,
    fs: 'empty'
  }
};
