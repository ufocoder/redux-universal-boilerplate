let WebpackIsomorphicTools = require('webpack-isomorphic-tools')
let config = require('../webpack/isomorphic.config')

let projectBasePath = require('path').resolve(__dirname)
let devMode = process.env.NODE_ENV !== 'production'

let webpackIsomorphicTools = new WebpackIsomorphicTools(config)
  .server(projectBasePath, () => {
    require('../dist/server')
  })

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEV__ = devMode
global.webpackIsomorphicTools = webpackIsomorphicTools
