const { renderregisterUser, registerUser, renderLoginForm, loginUser } = require("../controller/auth/authController");


const router = require("express").Router()
//app.get("/register",registerUser)

router.route("/register").get(renderregisterUser).post(registerUser)

router.route("/login").get(renderLoginForm).post(loginUser)



module.exports = router;