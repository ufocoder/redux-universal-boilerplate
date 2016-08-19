var clientBundlePath = require('../webpack/client/config').output.path;
var serverBundlePath = require('../webpack/server/config').output.path;
var path = require('path');
var del = require('del');

del.sync([
  path.resolve(path.join(clientBundlePath, '**')),
  path.resolve(path.join(serverBundlePath, '**')),
  '!' + path.resolve(path.join(clientBundlePath)),
  '!' + path.resolve(path.join(serverBundlePath)),
  '!' + path.resolve(path.join(clientBundlePath, '.gitignore')),
  '!' + path.resolve(path.join(serverBundlePath, '.gitignore'))
]);
