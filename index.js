const express = require("express");
require("dotenv").config();
const DBUtils = require("./utils/dbutils");
const userService = require("./service/user_service");
const User = require("./model/user");
const userRouter = require("./routes/user_route");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/user", userRouter);

app.get("/api/products", (req, res) => {
  console.log("Hello from products");
  res.send("Hello Products GET");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
