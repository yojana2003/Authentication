const mongoose =require("mongoose")


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db is connected")
    }catch(err){
        console.log("DB error",err)
    }
}

module.exports = connectDB