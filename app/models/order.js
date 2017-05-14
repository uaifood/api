const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Order = new Schema({
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    by: { type: String, required: true },
    deliveryFee: { type: Number },
    closes: { type: Date, required: true },
    delivery: { type: Date, required: true }
})

mongoose.model('Order', Order)
