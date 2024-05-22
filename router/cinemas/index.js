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

module.exports = cinemasRouter
