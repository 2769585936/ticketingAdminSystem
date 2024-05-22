const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tagsCollected = new Schema({
  name: String
})

const tagsModel = mongoose.model('tags', tagsCollected)

module.exports = { tagsModel }
