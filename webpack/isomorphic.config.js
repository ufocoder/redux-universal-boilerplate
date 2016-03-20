/* eslint camelcase: [2, {properties: "never"}] */

var path = require('path');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

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
        'css',
        'scss'
      ],
      filter(module, regularExpression, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(
            module,
            regularExpression,
            options,
            log
          );
        }
      },
      path: WebpackIsomorphicToolsPlugin.style_loader_path_extractor,
      parser: WebpackIsomorphicToolsPlugin.css_loader_parser
    }
  }
};
