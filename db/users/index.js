const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userCollected = new Schema({
  name: String,
  phone: Number,
  userPicture: String,
  password:{type:String}
})



const MyUserModel = mongoose.model('users', userCollected)

module.exports = MyUserModel
