const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const log = require('./libs/log')(module)
const config = require('./libs/config')
const OrderModel = require('./libs/mongoose').OrderModel
const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
  res.send('API is running')
})

app.get('/0.1/orders', (req, res) => {
  return OrderModel
    .find({})
    .sort({'closes': 'desc'})
    .limit(10)
    .populate('restaurantId')
    .exec((err, orders) => {
    if (!err) {
      return res.send(orders)
    } else {
      res.statusCode = 500
      log.error('Internal error(%d): %s',res.statusCode,err.message)
      return res.send({ error: 'Server error' })
    }
  })
})

app.use((req, res, next) => {
  res.status(404)
  log.debug('Not found URL: %s', req.url)
  res.send({ error: 'Not found' })
  return
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  log.error('Internal error(%d): %s', res.statusCode, err.message)
  res.send({ error: err.message })
  return
})

app.listen(config.get('port'), () => {
  log.info('Express server listening on port 1337')
})
