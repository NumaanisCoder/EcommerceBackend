const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stocks: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Available",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
