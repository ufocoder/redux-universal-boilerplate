/* eslint camelcase: [2, {properties: "never"}] */

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

        return regularExpression.test(module.name);
      },
      path: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(
            module,
            options,
            log
          );
        }

        return module.name;
      },
      parser: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_loader_parser(
            module,
            options,
            log
          );
        }

        return module.source;
      }
    }
  }
};
