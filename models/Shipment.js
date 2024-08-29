const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  shippingMethodID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShippingMethod",
    required: true,
  },
  trackingNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Shipment", shipmentSchema);
