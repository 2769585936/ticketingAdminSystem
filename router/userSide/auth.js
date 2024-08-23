const express = require('express')
const userLogin = express.Router()
const MyUserModel = require('../../db/users/index')
const MyAdminUserModel = require('../../db/adminUsers/index')
const { signature } = require('../../config/index')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { default: mongoose } = require('mongoose')
const { errorSend, successSend } = require('../../utils/index')

const { tokenVerify } = require('../../utils/tokenVerify')

userLogin.post('/login', async (req, res) => {
  const { environment } = req.headers
  const { phone, password, userName } = req.body
  let data

  if (environment) {
    data = await MyAdminUserModel.findOne({ userName, password }).select({
      password: 0
    })
  } else {
    data = await MyUserModel.findOne({ phone, password }).select({
      password: 0
    })
  }

  if (!data) {
    return errorSend(res, {
      code: '0001',
      message: '用户名或密码错误'
    })
  }

  const token = jwt.sign(
    {
      phone: data.phone,
      id: data._id
    },
    signature,
    {
      expiresIn: '7days'
    }
  )
  return res.send({
    code: '0000',
    data: data,
    token: token,
    message: {
      message: '登录成功',
      type: 'success'
    }
  })
})

// 修改用户
userLogin.post('/update/user', tokenVerify, async (req, res) => {
  const { _id } = req.body
  console.log(_id)
  const obj = { ...req.body }
  delete obj._id
  delete obj.userPicture
  await updateUser(_id, obj)
  const data = await findUserOne(_id)
  successSend(res, {
    data: data,
    message: '修改成功'
  })
})

// 修改用户图像
userLogin.post('/update/user/picture', tokenVerify, async (req, res) => {
  const file = req.files.file
  const _id = req.body._uid
  let userInfo = await findUserOne(_id)
  if (userInfo != undefined) {
    const filePath = `images/${Date.now()}${file.name}`
    const oldPath = userInfo.userPicture.match(/images\/.*/)[0]
    await fs.writeFileSync(oldPath, file.data)
    userInfo.userPicture = userInfo.userPicture.replace(/(images)\/.*/g, filePath)
    // 修改名称
    fs.renameSync(oldPath, filePath)
    const s = await updateUser(_id, { userPicture: userInfo.userPicture })

    const result = await findUserOne(_id)
    successSend(res, {
      data: result,
      message: '修改成功'
    })
  } else {
    errorSend(res, {
      code: '0001',
      message: '上传图片失败'
    })
  }
})

// 用户列表
userLogin.get('/user', tokenVerify, async (req, res) => {
  const { phone, userState } = req.query
  let data
  const queryObj = {}
  // 有phone
  if (phone) {
    const $or = [{ phone: phone }]
    mongoose.isValidObjectId(phone) && $or.push({ _id: phone })
    queryObj.$or = $or
    console.log(queryObj)
  }
  // 有state
  if (userState != null && userState != '0') queryObj.state = userState
  data = await findUser(queryObj)

  res.send({
    code: '0000',
    data: data
  })
})

async function findUserOne(_id) {
  const data = await MyUserModel.findOne({ _id }).select({ password: 0 })
  return data
}

async function findUser(obj) {
  const data = await MyUserModel.find(obj).select({ password: 0 })
  return data
}

async function updateUser(_id, val) {
  return await MyUserModel.updateOne({ _id }, val)
}

module.exports = userLogin
