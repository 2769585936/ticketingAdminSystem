const express = require('express')
const router = express.Router()
const userLogin = require('./userSide/auth')
const userFilmInfo = require('./filmInfo/index')

router.use('/', userLogin)
router.use('/', userFilmInfo)

module.exports = router
