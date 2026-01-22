const { default: mongoose } = require("mongoose")
const mogoose =require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        required:false
    }
},{timestamps:true})

// CREATE MODEL FOR OPERATION USER CREATE OR DELETE

const User = mongoose.model("User",userSchema)

module.exports = User