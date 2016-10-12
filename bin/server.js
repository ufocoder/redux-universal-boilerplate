var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var config = require('../webpack/isomorphic.config');

var projectBasePath = require('path').resolve(__dirname);
var devMode = process.env.NODE_ENV !== 'production';

var webpackIsomorphicTools = new WebpackIsomorphicTools(config)
  .server(projectBasePath, () => {
    require('../dist/server');
  });

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = devMode;
global.webpackIsomorphicTools = webpackIsomorphicTools;
