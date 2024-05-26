const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cinemaCollected = new Schema({
  cinemaName: String,
  address: String,
  pictureUrl: String
})

const MyCinemasModel = mongoose.model('cinemas', cinemaCollected)

const filmSessionsCollected = new Schema({
  _fid: [{ type: Schema.Types.ObjectId, ref: 'movies' }],
  _cid: [{ type: Schema.Types.ObjectId, ref: 'cinemas' }],
  seat: Array,
  hall: String,
  startTime: String
})

const MyFilmSessionsModel = mongoose.model('filmSessions', filmSessionsCollected)

module.exports = { MyCinemasModel, MyFilmSessionsModel }
