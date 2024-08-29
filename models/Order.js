const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    shippingAddressID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingAddress",
      required: true,
    },
    billingAddressID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BillingAddress",
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
