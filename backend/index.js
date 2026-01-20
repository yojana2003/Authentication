const express=require("express")
const dotenv=require("dotenv")
const connectDB =require("./config/db")
dotenv.config()

let app =express()
let port= process.env.PORT || 4000

app.get("/",(req,res)=>{
    res.send("hellow")
})

app.listen(port,()=>{
    connectDB()
    console.log(`server is started at ${port}`)
})