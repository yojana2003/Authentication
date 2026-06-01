const bcryptjs =require("bcryptjs")
const User =require("../models/user.model.js")
const generateToken = require("../config/token.js")
const jwt = require("jsonwebtoken")



const signup= async (req,res)=>{
    try{
        const {firstName, lastName,email,password,userName,}=req.body
        const profileImage = req.file ? `/uploads/${req.file.filename}` : ""

        if(!firstName || !lastName || !email || !password || !userName){
            return res.status(400).json({message:"filled all details"})
        }

        let existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"user is allready exist"})
        }

        const hassedPassword = await bcryptjs.hash(password,10)

        const user= await User.create({
            firstName,
            lastName,
            email,
            password:hassedPassword,
            userName,
            profileImage,
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
            profileImage,
        }})

    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
}

const login = async (req,res)=>{
    try{
        const{email,password}=req.body

        if(!email || !password){
            return res.status(400).json({message:"filled all details"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"invalid email or password"})
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:"invalid email or password"})
        }

        const token = generateToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIROMENT == "production",
            sameSite: "Strict",
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({user:{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.userName,
            profileImage: user.profileImage,
        }})

    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
}

const getUserData = async (req, res) => {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message:"not authenticated"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SCREAT)
        const user = await User.findById(decoded.id).select("-password")
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json(user)
    } catch(error) {
        return res.status(401).json({message:"not authenticated"})
    }
}

const logout = (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({message:"logged out"})
}



module.exports = {signup, login, getUserData, logout}
