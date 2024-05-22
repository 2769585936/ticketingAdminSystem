const mongoose = require('mongoose')

const Schema = mongoose.Schema

const moviesCollected = new Schema({
  filmTitle: String,
  pictureUrl: String,
  score: Number,
  describe: String,
  recommend: Boolean,
  isHot: Boolean
})

const MyMoviesModel = mongoose.model('movies', moviesCollected)

module.exports = { MyMoviesModel }
