const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recommendCollected = new Schema({
  filmTitle: String,
  pictureUrl: String,
  score: Number,
  describe: String
})

const MyRecommendModel = mongoose.model('recommends', recommendCollected)

module.exports = { MyRecommendModel }
