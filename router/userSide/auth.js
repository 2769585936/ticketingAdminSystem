const express = require('express')
const userLogin = express.Router()
const MyUserModel = require('../../db/users/index')
const { signature } = require('../../config/index')
const jwt = require('jsonwebtoken')

userLogin.post('/login', async (req, res) => {
  const { phone, password } = req.body
  console.log(phone, password)
  const data = await MyUserModel.findOne({ phone, password }).select({
    password: 0
  })
  console.log(data)
  if (!data) {
    return res.send({
      code: '0001',
      data: null,
      msg: '用户名或密码错误'
    })
  }

  const token = jwt.sign(
    {
      phone: data.phone,
      id: data._id
    },
    signature,
    {
      expiresIn: '7 days'
    }
  )
  return res.send({
    code: '0000',
    data: data,
    msg: 'ok',
    token: token
  })
})

module.exports = userLogin
