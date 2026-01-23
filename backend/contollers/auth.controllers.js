// import User from "../models/user.model.js"
const bcryptjs =require("bcryptjs")
const User =require("../models/user.model.js")
const generateToken = require("../config/token.js")



const signup= async (req,res)=>{
    try{
        const {firstName, lastName,email,password,userName,}=req.body

        if(!firstName || !lastName || !email || !password || !userName){
            return res.status(400).json({message:"filled all details"})
        }
        //is user allredy exist or not

        let existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"user is allready exist"})
        }

        //password hash(bycrptjs)
        const hassedPassword = await bcryptjs.hash(password,10)

        //create user

        const user= await User.create({
            firstName,
            lastName,
            email,
            password:hassedPassword,
            userName,

        })
        
        let token ;
        try{
        token = generateToken(user._id)
        } catch(error){
            console.log(error)
        }

        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENVIROMENT == "production",
            sameSite: "Strict",
            maxAge : 7*24*60*60*1000
        })

        return res.status(201).json({user:{
            firstName,
            lastName,
            email,
            userName,
        }})

    }catch(error){

        return res.status(500).json({message:"internal server error"})
    }
}

const login = async (req,res)=>{
    try{
        const{email,password}=req.body
    }catch(error){
        return res.status(500).json(error)
    }
}



module.exports = {signup,login}