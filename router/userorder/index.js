// 创建订单接口
const express = require('express')
const { userOrderModel } = require('../../db/userorder/index')
const { MyFilmSessionsModel } = require('../../db/cinemas')
const { MyMoviesModel } = require('../../db/filmInfo')
const createOrderRouter = express.Router()

createOrderRouter.post('/createUserOrder', async (req, res) => {
  const body = req.body
  const data = await userOrderModel.create(body)
  return res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})

createOrderRouter.get('/userorder', async (req, res) => {
  const { _id } = req.query
  const data = await userOrderModel.find({ _id })
  return res.send({
    code: '0000',
    data: data[0],
    msg: 'ok'
  })
})

createOrderRouter.post('/updateuserorder', async (req, res) => {
  const { _id, currentOrderState } = req.body

  let data = null
  try {
    if (currentOrderState == 1) {
      data = await userOrderModel.findOneAndUpdate({ _id }, { currentOrderState })
      let { seat } = await MyFilmSessionsModel.findOne({ _id: data._changciid }).select({ seat: 1 })

      for (const str of Object.keys(data.seat)) {
        let [row, column] = str.split('-')
        seat[row][column].isSelected = true
      }
      await MyFilmSessionsModel.updateOne({ _id: data._changciid }, { seat: seat })
    }
    return res.send({
      code: '0000',
      data: data,
      msg: 'ok'
    })
  } catch (e) {
    return res.send({
      code: '0001',
      data: data,
      msg: '数据错误'
    })
  }
})

// 获取用户列表订单
createOrderRouter.get('/userorders', async (req, res) => {
  const { userid, type, _id } = req.query

  const obj = {}
  switch (type) {
    case 'all':
      obj._userid = userid
      break
    case 'id':
      obj._id = _id
      break
    case 'unpai':
      obj._userid = userid
      obj.currentOrderState = 2
      break
    case 'pai':
      obj._userid = userid
      obj.currentOrderState = 1
      break
  }

  let data = await userOrderModel.find(obj).sort({ orderStartTime: -1 })
  const k = {}
  for (const item of data) {
    item.movies = await MyFilmSessionsModel.find({ _id: item._changciid }).populate(['_cid', '_fid'])
  }

  return res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})

createOrderRouter.delete('/deleteuserOrder', async (req, res) => {
  const { _id } = req.query 
  const data = await userOrderModel.deleteOne({ _id })
  return res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})
module.exports = createOrderRouter
