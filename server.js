const fs = require('fs');
const join = require('path').join;
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/index')
const models = join(__dirname, 'app/models')
const app = express()

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)))

require('./config/routes')(app)
require('./config/express')(app)

const listen = () => {
  app.listen(config.get('port'), () => {
    console.log('Express server listening on port ' + config.get('port'))
  })
}

const connect = () => {
  return mongoose.connect(config.get('mongoose:uri')).connection
}

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen)

module.exports = app
