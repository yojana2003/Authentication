const express=require("express")
const dotenv=require("dotenv")
const connectDB =require("./config/db")
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")
dotenv.config()

const app =express()
let port= process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())

app.use("/api",authRouter)

app.listen(port,()=>{
    connectDB()
    console.log(`server is started at ${port}`)
})