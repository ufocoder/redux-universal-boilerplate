let clientBundlePath = require('../webpack/client/config').output.path
let serverBundlePath = require('../webpack/server/config').output.path
let path = require('path')
let del = require('del')

del.sync([
  path.resolve(path.join(clientBundlePath, '**')),
  path.resolve(path.join(serverBundlePath, '**')),
  '!' + path.resolve(path.join(clientBundlePath)),
  '!' + path.resolve(path.join(serverBundlePath)),
  '!' + path.resolve(path.join(clientBundlePath, '.gitignore')),
  '!' + path.resolve(path.join(serverBundlePath, '.gitignore'))
])
