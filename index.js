const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const log = require('./libs/log')(module)
const config = require('./libs/config')
const app = express()
const mongoose = require('mongoose')

require('./libs/mongoose')

const fs = require('fs');
const join = require('path').join;

const models = join(__dirname, 'app/models');

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

const orders = require('./app/controllers/orders')

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
  res.send('API is running')
})

app.get('/0.1/orders', orders.index)

app.use((req, res, next) => {
  res.status(404)
  console.log('Not found URL: %s', req.url)
  res.send({ error: 'Not found' })
  return
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  console.log('Internal error(%d): %s', res.statusCode, err.message)
  res.send({ error: err.message })
  return
})

app.listen(config.get('port'), () => {
  console.log('Express server listening on port 1337')
})
