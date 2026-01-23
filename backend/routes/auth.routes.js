const express = require("express")
const { signup, login } = require("../contollers/auth.controllers.js")

//for specific router from express
const authRouter =express.Router()


//signup router
authRouter.post("/signup",signup)
authRouter.post("/login",login)


module.exports = authRouter