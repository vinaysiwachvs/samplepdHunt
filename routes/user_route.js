const express = require("express");
const router = express.Router();
const { createUser, getUserByEmail } = require("../controller/user_controller");

router.route("/").post(createUser);
router.route("/email").post(getUserByEmail);
module.exports = router;
