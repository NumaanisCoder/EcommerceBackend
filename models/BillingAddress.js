const mongoose = require("mongoose");

const billingAddressSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  houseNumber: {
    type: Number,
  },
  Street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "Home",
    required: true,
  },
});

module.exports = mongoose.model("BillingAddress", billingAddressSchema);
