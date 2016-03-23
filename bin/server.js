var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var config = require('../webpack/isomorphic.config');

var projectBasePath = require('path').resolve(__dirname);

var webpackIsomorphicTools = new WebpackIsomorphicTools(config)
  .development(process.env.NODE_ENV !== 'production')
  .server(projectBasePath, () => {
    require('../dist/server');
  });

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = process.env.NODE_ENV !== 'production';
global.webpackIsomorphicTools = webpackIsomorphicTools;
