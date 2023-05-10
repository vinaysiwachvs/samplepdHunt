const express = require("express");
const router = express.Router();
const {signup,login,logout,verifyToken,verifyOtp,} = require("../controller/auth_controller");

router.route("/signup").post(signup);
router.route("/verify").post(verifyOtp);
router.route("/login").post(login);
router.route("/logout").post(verifyToken, logout);
module.exports = router;