const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gst: {
    type: String,
    required: true,
  },
  bankAccountDetails: {
    /* more attributes yet to be write */
  },
  warehouseAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Seller", sellerSchema);
