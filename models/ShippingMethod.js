const mongoose = require("mongoose");

const shippingMethodSchema = new mongoose.Schema({
  carrierID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShippingCarrier",
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  delieveryTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("ShippingMethod", shippingMethodSchema);
