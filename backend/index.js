const express=require("express")
const dotenv=require("dotenv")
const connectDB =require("./config/db")
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")
const cors = require("cors")
dotenv.config()

const app =express()
let port= process.env.PORT || 4000

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static(require("path").join(__dirname, "uploads")))

app.use("/api",authRouter)

app.listen(port,()=>{
    connectDB()
    console.log(`server is started at ${port}`)
}) 