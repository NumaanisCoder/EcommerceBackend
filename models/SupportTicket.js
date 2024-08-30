const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Open",
    required: true,
  },
});

module.exports = mongoose.model("SupportTicket", supportTicketSchema);
