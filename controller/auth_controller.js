const { response } = require("express");
const User = require("../model/user");
const userService = require("../service/user_service");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  console.log("In POST register User ");
  try {
    const { name, email, password } = req.body;
    console.log("In POST register User " + name + " " + email + " " + password);
    let user = new User({ name, email, password });

    console.log("In POST user " + user);
    await userService.createUser(user);

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("error in user post ", error);
    res.status(400).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  console.log("In POST register User ");
  try {
    const { email, password: inputPassword } = req.body;
    console.log("In POST login User ", email, inputPassword);
    const user = await userService.getUserByEmail(email);
    console.log("user " + user);
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(inputPassword, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // const token = await userService.generateAuthToken(user);

    res.status(201).send({ message: "User logged in successfully" });
  } catch (error) {
    console.log("error in user post ", error);
    res.status(400).send({ message: error.message });
  }
};
