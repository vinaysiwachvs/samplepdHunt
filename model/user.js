const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
    unique: true,
  },

  password: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    maxlength: 200,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
