const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema(
  {
    returnID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Return",
    },
    amount: {
      type: Number,
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

module.exports = mongoose.model("Refund", refundSchema);
