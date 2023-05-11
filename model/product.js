const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    maxlength: 2000,
  },
  icon: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
    maxlength: 400,
  },
  images: {
    type: Array,
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedOn: {
    type: Date,
    default: Date.now(),
  },
  tag:[{
    id:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    }
    }
  ],
  upvotes:{
    type:Number,
    default:0
  },
  comment:{
    id:{
      type:String,
      required:true
    },
    text:{
      type:String,
      required:true,
      maxlength:2000,
      
    }
  }
});

module.exports = mongoose.model("Product", productSchema);
