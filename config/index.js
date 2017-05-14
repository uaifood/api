const nconf = require('nconf')

nconf.argv()
  .env({separator:'__'})
  .file({ file: './config.json' })

module.exports = nconf
