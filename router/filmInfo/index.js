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
  const { limit } = req.query
  const data = await MyMoviesModel.find({ isHot: true }).limit(limit)
  // console.log(data)
  res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})

// 热售
userFilmInfo.get('/preSale', async (req, res) => {
  const { limit } = req.query
  const data = await MyMoviesModel.find({ isPre: true }).limit(limit)
  res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})

module.exports = userFilmInfo
