const express = require('express')
const { MyCinemasModel, MyFilmSessionsModel } = require('../../db/cinemas/index')
const cinemasRouter = express.Router()

cinemasRouter.get('/cinemas', async (req, res) => {
  // 这个id是电影ID 根据电影获取影城
  const { id } = req.query
  console.log(id)
  let data
  if (id) {
    data = await MyFilmSessionsModel.find({ _fid: id }).populate('_cid').select({ _fid: 1 })
    data = data.map(item => {
      return {
        _cid: item._cid[0],
        _fid: item._fid,
        _id: item._id
      }
    })
    console.log(data)
  } else {
    data = await MyCinemasModel.find()
  }

  return res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})

// 根据_id 获取信息
cinemasRouter.get('/cinemasid', async (req, res) => {
  // 这个id是电影ID 根据电影获取影城
  const { _id } = req.query

  let data
  if (_id) {
    data = await MyFilmSessionsModel.find({ _id }).populate(['_cid', '_fid'])
  } else {
    data = await MyCinemasModel.find()
  }

  return res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})
// 获取根据_fid 和_cid 获取有几个场次
cinemasRouter.get('/cinemasTime', async (req, res) => {
  const { _cid, _fid } = req.query
  let data
  if (_cid && _fid) {
    data = await MyFilmSessionsModel.find({ _fid, _cid }).populate(['_cid', '_fid'])
    // data = data.map(item => {
    //   return {
    //     _cid: item._cid[0],
    //     _fid: item._fid,
    //     _id: item._id
    //   }
    // })
    console.log(data)
  } else {
    data = await MyCinemasModel.find()
  }

  return res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})

module.exports = cinemasRouter
