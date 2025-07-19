
const express = require('express')
const router = express.Router();
// const { body } = require('express-validator');
// const Token_Verify = require('../Middleware/tokenVerify')

const UserController = require("../controllers/userController");;

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);


module.exports = router