// 其他接口
const express = require('express')
const { tagsModel } = require('../../db/other/index')
const otherRouter = express.Router()

otherRouter.get('/tags', async (req, res) => {
  const data = await tagsModel.find()
  return res.send({
    code: '0000',
    data: data,
    msg: 'ok'
  })
})

module.exports = otherRouter
