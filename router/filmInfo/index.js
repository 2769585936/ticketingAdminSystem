const express = require('express')
const userFilmInfo = express.Router()
const { MyRecommendModel } = require('../../db/filmInfo/index')

// 获取推荐电影
userFilmInfo.get('/recommend', async (req, res) => {
  const data = await MyRecommendModel.find().limit(3)
  console.log(data)
  res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})

module.exports = userFilmInfo
