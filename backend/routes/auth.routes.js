const express = require("express")
const { signup } = require("../contollers/auth.controllers.js")

//for specific router from express
const authRouter =express.Router()


//signup router
authRouter.post("/signup",signup)


module.exports = authRouter