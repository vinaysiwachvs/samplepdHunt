const express = require("express");
const router = express.Router();
const {getUserByEmail } = require("../controller/user_controller");
const { verifyToken } = require("../controller/auth_controller");
// router.route("/").post(createUser);
router.route("/").post(verifyToken, getUserByEmail);
module.exports = router;
