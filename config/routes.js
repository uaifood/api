const orders = require('../app/controllers/orders')

module.exports = (app) => {
  app.get('/0.1/orders', orders.index)
  app.get('/test/orders', orders.index)
}
