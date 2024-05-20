const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const router = require('./router/index')
const MyUserModel = require('./db/users/index')

mongoose.connect('mongodb://127.0.0.1:27017/db').then(async () => {
  console.log('链接MongoDb db数据库成功')
  const data = await MyUserModel.find()
  console.log(data)
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
app.get('/app', (req, res) => {
  res.send('9898')
})

app.listen(3000, () => {
  console.log('http://localhost:3000  启动')
})
