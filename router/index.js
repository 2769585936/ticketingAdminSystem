const express = require('express')
const router = express.Router()
const userLogin = require('./userSide/auth')
const userFilmInfo = require('./filmInfo/index')
const otherRouter = require('./other/index')
const cinemasRouter = require('./cinemas/index')

// 登录路由
router.use('/', userLogin)
// 电影信息接口路由
router.use('/', userFilmInfo)
// 其他接口路由
router.use('/', otherRouter)

// 影院
router.use('/', cinemasRouter)

module.exports = router
