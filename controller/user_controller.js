const User = require("../model/user");
const userService = require("../service/user_service");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = new User({ name, email, password });
    console.log("In POST user " + user);
    await userService.createUser(user);

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("error in user post ", error);
    res.status(400).send({ message: error.message });
  }
};

module.exports = { createUser };
