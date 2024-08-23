const mongoose = require('mongoose')

const Schema = mongoose.Schema
const adminUserCollected = new Schema({
  _id: mongoose.Types.ObjectId,
  userName: String,
  name: String,
  userPicture: String,
  password: String
})

const MyAdminUserModel = mongoose.model('adminusers', adminUserCollected)

module.exports = MyAdminUserModel
