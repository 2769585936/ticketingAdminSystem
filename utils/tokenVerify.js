const MyUserModel = require('../db/users/index')
const MyAdminUserModel = require('../db/adminUsers/index')
const jwt = require('jsonwebtoken')
const { signature } = require('../config/index')
const { errorSend } = require('./index')

// 创建一个拦截器 判断token 是否有效
/**
 *
 * @param {*} req 请求
 * @param {*} res 响应
 * @param {*} next
 * @returns
 */
function tokenVerify(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return errorSend(res, {
        code: '0003',
        message: 'token 不能为空'
      })
    }

    let findDb = MyUserModel
    if (req.headers.environment === 'Admin') findDb = MyAdminUserModel
    console.log(token)

    jwt.verify(token, signature, async (err, { id } = {}) => {
      if (err) {
        return errorSend(res, {
          code: '0003',
          message: 'token 无效'
        })
      }
      console.log(id)
      const data = await findDb.findOne({ _id: id }).catch(err => {})
      if (!data) {
        return errorSend(res, {
          code: '0003',
          message: 'token 无效'
        })
      }
      req.body._uid = id
      next()
    })
  } catch (err) {
    errorSend(res, {
      code: '0003',
      message: 'token 无效'
    })
  }
}

module.exports = { tokenVerify }
