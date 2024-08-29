const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema(
  {
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Return", returnSchema);
