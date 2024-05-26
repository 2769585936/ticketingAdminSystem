const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userPreOrderCollected = new Schema({
  _changciid: [{ type: Schema.Types.ObjectId, ref: 'filmsessions' }],
  _userid: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  seat: Object,
  xiaofei: Number,
  count: Number,
  price: Number,
  totalcost: Number,
  orderStartTime: Date,
  currentOrderState: Number,
  movies: Object
})

const userOrderModel = mongoose.model('userorders', userPreOrderCollected)

module.exports = { userOrderModel }
