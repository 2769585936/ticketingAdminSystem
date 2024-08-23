// 创建订单接口
const express = require('express')
const { userOrderModel } = require('../../db/userorder/index')
const { MyFilmSessionsModel } = require('../../db/cinemas')
const { MyMoviesModel } = require('../../db/filmInfo')
const { errorSend, successSend } = require('../../utils')
const { default: mongoose } = require('mongoose')
const createOrderRouter = express.Router()

createOrderRouter.post('/createUserOrder', async (req, res) => {
  const body = req.body
  const data = await userOrderModel.create(body)
  return res.send({
    code: '0000',
    data: data
  })
})

createOrderRouter.get('/userorder', async (req, res) => {
  const { _id } = req.query
  const data = await userOrderModel.find({ _id })
  return res.send({
    code: '0000',
    data: data[0]
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
      data: data
    })
  } catch (e) {
    errorSend(res, {
      code: '0001',
      message: '数据错误'
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
  for (const item of data) {
    item.movies = await MyFilmSessionsModel.find({ _id: item._changciid }).populate(['_cid', '_fid'])
  }

  return res.send({
    code: '0000',
    data: data
  })
})

createOrderRouter.delete('/deleteuserOrder', async (req, res) => {
  const { _id } = req.query
  const data = await userOrderModel.deleteOne({ _id })
  return successSend(res, {
    code: '0000',
    data: data,
    message: '删除成功'
  })
})

createOrderRouter.get('/orders', async (req, res) => {
  try {
    const { id, state } = req.query
    let reqObj = {},
      data,
      $or = []
    if (id != null) {
      if (!mongoose.isValidObjectId(id)) {
        return errorSend(res, {
          code: '0007',
          message: 'id 格式不正确'
        })
      }
      $or.push({ _id: id })
      $or.push({ _userid: [id] })
      reqObj.$or = $or
    }
    if (state != null && state != '0') {
      reqObj.currentOrderState = state
    }
    data = await orderFind(reqObj)
    return res.send({
      code: '0000',
      data: data
    })
  } catch (e) {
    errorSend(res, {
      code: '0008',
      message: '请求错误'
    })
  }
})

async function orderFind(val) {
  return userOrderModel.find(val)
}

module.exports = createOrderRouter
