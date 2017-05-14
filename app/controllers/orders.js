const mongoose = require('mongoose');
const OrderModel = mongoose.model('Order');

exports.index = (req, res) => {
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
      console.log('Internal error(%d): %s',res.statusCode,err.message)
      return res.send({ error: 'Server error' })
    }
  })
}
