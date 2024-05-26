const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const md5 = require('md5')
const { address, port, db } = require('./config/index')
const router = require('./router/index')
const MyUserModel = require('./db/users/index')

mongoose.connect(`${address}:${port}/${db}`).then(async () => {
  console.log('连接数据库')
})

//4. 设置回调
// 设置连接成功的回调  once 一次   事件回调函数只执行一次
mongoose.connection.once('open', () => {
  // success()
})

// 设置连接错误的回调
mongoose.connection.on('error', () => {
  // error()
})

//设置连接关闭的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭')
})

// mongoose

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// 配置跨域
app.use(cors())

app.use('/static/images', express.static('images'))
app.use('/api', router)

// 测试接口
app.get('/app', (req, res) => {
  res.send('9898')
})

app.listen(3000, () => {
  console.log('http://localhost:3000  启动')
})
