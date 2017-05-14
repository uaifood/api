const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Restaurant = new Schema({
    _id: { type: String },
    name: { type: String, required: true },
    phone: { type: Number },
    deliveryFee: { type: Number },
    image: { type: String, required: true },
    menu: { type: String, required: true }
})

mongoose.model('Restaurant', Restaurant)
