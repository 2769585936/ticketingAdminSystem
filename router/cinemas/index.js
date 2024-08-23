const express = require('express')
const { MyCinemasModel, MyFilmSessionsModel } = require('../../db/cinemas/index')
const { default: mongoose } = require('mongoose')
const { successSend } = require('../../utils')
const cinemasRouter = express.Router()

cinemasRouter.get('/cinemas', async (req, res) => {
  // 这个id是电影ID 根据电影获取影城
  const { id, cinemaName } = req.query
  let data
  if (id) {
    data = await MyFilmSessionsModel.find({ _fid: id }).populate('_cid').select({ _fid: 1 })
    // 去重
    const uniqueCinemas = new Set()
    data = data.reduce((acc, item) => {
      if (!uniqueCinemas.has(item._cid[0]._id)) {
        uniqueCinemas.add(item._cid[0]._id)
        acc.push({
          _cid: item._cid[0],
          _fid: item._fid,
          _id: item._id
        })
      }
      return acc
    }, [])
  } else if (cinemaName) {
    // 影城名模查询
    const $or = [{ cinemaName }]
    mongoose.isValidObjectId(cinemaName) && $or.push({ _id: cinemaName })
    data = await MyCinemasModel.find({
      $or
    })
  } else {
    data = await MyCinemasModel.find()
  }

  return res.send({
    code: '0000',
    data: data
  })
})

// 根据_id 获取信息
cinemasRouter.get('/cinemasid', async (req, res) => {
  const { _id } = req.query
  let data
  if (_id) {
    data = await MyFilmSessionsModel.find({ _id }).populate(['_cid', '_fid'])
  } else {
    data = await MyCinemasModel.find()
  }

  return res.send({
    code: '0000',
    data: data
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
  } else {
    data = await MyCinemasModel.find()
  }

  return res.send({
    code: '0000',
    data: data
  })
})

// cinema
cinemasRouter.post('/update/cinema', async (req, res) => {
  const { _id, address, cinemaName } = req.body
  let reqObj = {},
    data

  if (address) reqObj.address = address
  if (cinemaName) reqObj.cinemaName = cinemaName
  data = await MyCinemasModel.findByIdAndUpdate(_id, reqObj)
  successSend(res, {
    data,
    message: '修改成功'
  })
})

cinemasRouter.post('/delete/cinema', async (req, res) => {
  const { _id } = req.body
  const data = await MyCinemasModel.deleteOne({
    _id
  })
  successSend(res, {
    data,
    message: '删除成功'
  })
})
cinemasRouter.post('/add/cinema', async (req, res) => {
  const { cinemaName, address, pictureUrl, hall } = req.body
  let reqObj = {},
    data
  if (cinemaName) reqObj.cinemaName = cinemaName
  if (address) reqObj.address = address
  if (pictureUrl) reqObj.pictureUrl = pictureUrl
  if (!hall) reqObj.hall = ['A厅', 'B厅', 'C厅']
  data = await MyCinemasModel.insertMany(reqObj)
  successSend(res, {
    data,
    message: '添加成功'
  })
})

module.exports = cinemasRouter
