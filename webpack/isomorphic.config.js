/* eslint camelcase: [2, {properties: "never"}] */

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

/**
 * Style filter
 *
 * @param  {[type]} module            [description]
 * @param  {[type]} regularExpression [description]
 * @param  {[type]} options           [description]
 * @param  {[type]} log               [description]
 * @return {[type]}                   [description]
 */
function styleFilter(module, regularExpression, options, log) {
  if (options.development) {
    return WebpackIsomorphicToolsPlugin.style_loader_filter(
      module,
      regularExpression,
      options,
      log
    );
  }

  return regularExpression.test(module.name);
}

/**
 * Style path
 *
 * @param  {[type]} module  [description]
 * @param  {[type]} options [description]
 * @param  {[type]} log     [description]
 * @return {[type]}         [description]
 */
function stylePath(module, options, log) {
  if (options.development) {
    return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(
      module,
      options,
      log
    );
  }

  return module.name;
}

/**
 * Style parser
 * @param  {[type]} module  [description]
 * @param  {[type]} options [description]
 * @param  {[type]} log     [description]
 * @return {[type]}         [description]
 */
function styleParser(module, options, log) {
  if (options.development) {
    return WebpackIsomorphicToolsPlugin.css_loader_parser(
      module,
      options,
      log
    );
  }

  return module.source;
}

module.exports = {
  webpack_assets_file_path: '../webpack-assets.json',
  webpack_stats_file_path: '../webpack-stats.json',
  assets: {
    images: {
      extensions: [
        'png',
        'jpg',
        'gif',
        'ico',
        'svg'
      ]
    },
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot'
      ]
    },
    styles: {
      extensions: [
        'css'
      ],
      filter: styleFilter,
      path: stylePath,
      parser: styleParser
    }
  }
};
