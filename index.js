const express = require("express");
require("dotenv").config();
const DBUtils = require("./utils/dbutils");
const userService = require("./service/user_service");
const User = require("./model/user");
const userRouter = require("./routes/user_route");
const authRouter = require("./routes/auth_route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.get("/api/products", (req, res) => {
  console.log("Hello from products");
  res.send("Hello Products GET API 123");
});

app.get("/", (req, res) => {
  console.log("Hello from root");
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
