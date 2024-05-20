const express=require("express")
const cors =require("cors")
const router=require("./router/index")

console.log(router);
const app = express()

app.use(express.json())

app.use(express.urlencoded({extended:false}))




// 配置跨域
app.use(cors())
app.use('/api',router)
app.get("/app",(req,res)=>{
  res.send("9898")
  })

app.listen(3000,()=>{
  console.log("http://localhost:3000  启动")
})