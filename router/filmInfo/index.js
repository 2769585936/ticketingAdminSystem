const express = require('express')
const userFilmInfo = express.Router()
const { MyMoviesModel } = require('../../db/filmInfo/index')
const { successSend, errorSend } = require('../../utils')
const { default: mongoose } = require('mongoose')

// 获取推荐电影
userFilmInfo.get('/recommend', async (req, res) => {
  const data = await MyMoviesModel.find({ recommend: true }).limit(3)
  res.send({
    code: '0000',
    data: data
  })
})
userFilmInfo.post('/update/recommend', async (req, res) => {
  try {
    const { _id, recommend } = req.body
    let data,
      reqObj = {}
    if (recommend != null) reqObj.recommend = recommend
    console.log(reqObj)
    data = await updateRecommend(_id, reqObj)
    successSend(res, {
      data,
      message: '修改成功'
    })
  } catch (err) {
    errorSend(res, {
      code: '0003',
      message: '修改失败'
    })
  }
})

// 热售
userFilmInfo.get('/hotSale', async (req, res) => {
  const { limit, length = 0 } = req.query
  const data = await MyMoviesModel.find({ isHot: true }).skip(length).limit(limit)
  res.send({
    code: '0000',
    data: data
  })
})

// 预售
userFilmInfo.get('/preSale', async (req, res) => {
  const { limit, length = 0 } = req.query
  const data = await MyMoviesModel.find({ isPre: true }).skip(length).limit(limit)
  res.send({
    code: '0000',
    data: data
  })
})
userFilmInfo.get('/movieInfo', async (req, res) => {
  const { _id } = req.query
  const data = await MyMoviesModel.find({ _id })
  res.send({
    code: '0000',
    data: data
  })
})

userFilmInfo.get('/movie', async (req, res) => {
  const { filmTitle } = req.query

  let reqObj = {},
    $or = [],
    data
  if (filmTitle != null && filmTitle.length) {
    mongoose.isValidObjectId(filmTitle) && $or.push({ _id: filmTitle })
    $or.push({ filmTitle: { $regex: filmTitle, $options: 'i' } })
    reqObj.$or = $or
  }

  data = await MyMoviesModel.find(reqObj)
  res.send({
    code: '0000',
    data: data
  })
})

async function updateRecommend(_id, obj) {
  const data = await MyMoviesModel.updateOne({ _id }, obj)
  return data
}

module.exports = userFilmInfo
