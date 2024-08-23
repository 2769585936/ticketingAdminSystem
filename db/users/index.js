const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userCollected = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  phone: String,
  userPicture: String,
  password: String,
  state: String
})

const MyUserModel = mongoose.model('users', userCollected)

module.exports = MyUserModel
