const mongoose = require('mongoose')
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const app = require('../../../server')
const Order = mongoose.model('Order')
const Restaurant = mongoose.model('Restaurant')

const _restaurant = {
    "_id": "41224d776a326fb40f000001",
    "name": "Restaurant",
    "phone": 3135662809,
    "deliveryFee": 0,
    "image": "https://www.image.com",
    "menu": "http://restaurant.com/menu"
}

const _order = {
    "by": "John Doe",
    "deliveryFee": 0,
    "closes": "2017-05-12T13:00:00.000Z",
    "delivery": "2017-05-12T15:00:00.000Z"
}

describe('GET /orders', () => {
  before((done) => {
    const restaurant = new Restaurant(_restaurant)
    restaurant.save((err, restaurant) => {
      const _orderWithRestaurant= Object.assign({}, { restaurantId: restaurant.id }, _order)
      const order = new Order(_orderWithRestaurant)
      order.save((err, order) => {
        done()
      })
    })
  })

  after((done) => {
    Order.remove({}, () => {
      Restaurant.remove({}, () => {
        done()
      })
    })
  })

  it('returns 1 result', (done) => {
    request(app)
      .get('/0.1/orders')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.have.lengthOf(1)
        done()
      })
  })
})
