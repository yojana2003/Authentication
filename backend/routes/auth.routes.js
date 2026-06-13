const express = require("express")
const { signup, login, getUserData, logout } = require("../contollers/auth.controllers.js")
const upload = require("../middleware/upload.js")

const authRouter =express.Router()

authRouter.post("/signup", upload.single("profileImage"), signup)
authRouter.post("/login", login)
authRouter.get("/getuserdata", getUserData)
authRouter.post("/logout", logout)

module.exports = authRouter
 