const express = require('express')
const userFilmInfo = express.Router()
const { MyMoviesModel } = require('../../db/filmInfo/index')

// 获取推荐电影
userFilmInfo.get('/recommend', async (req, res) => {
  const data = await MyMoviesModel.find({ recommend: true }).limit(3)
  res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})

// 热售
userFilmInfo.get('/hotSale', async (req, res) => {
  const { limit, length = 0 } = req.query
  console.log(length)
  const data = await MyMoviesModel.find({ isHot: true }).skip(length).limit(limit)
  res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})

// 预售
userFilmInfo.get('/preSale', async (req, res) => {
  const { limit, length = 0 } = req.query
  const data = await MyMoviesModel.find({ isPre: true }).skip(length).limit(limit)
  res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})
userFilmInfo.get('/movieInfo', async (req, res) => {
  const { _id } = req.query
  const data = await MyMoviesModel.find({ _id })
  res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})

module.exports = userFilmInfo
