const mongoose = require('mongoose')
const log = require('./log')(module)
const config = require('./config')

mongoose.connect(config.get('mongoose:uri'))
const db = mongoose.connection

db.on('error', (err) => {
  log.error('connection error:', err.message)
})

db.once('open', () => {
  log.info("Connected to DB!")
})

const Schema = mongoose.Schema

const Restaurant = new Schema({
    _id: { type: String },
    name: { type: String, required: true },
    phone: { type: Number },
    deliveryFee: { type: Number },
    image: { type: String, required: true },
    menu: { type: String, required: true }
})


const Order = new Schema({
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    by: { type: String, required: true },
    deliveryFee: { type: Number },
    closes: { type: Date, required: true },
    delivery: { type: Date, required: true }
})

const RestaurantModel = mongoose.model('Restaurant', Restaurant)
const OrderModel = mongoose.model('Order', Order)

module.exports.OrderModel = OrderModel
