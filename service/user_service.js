const mongoose = require("mongoose");
const User = require("../model/user");

exports.createUser = async (user) => {
  await user.save();
  console.log("User created successfully", user);
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};
