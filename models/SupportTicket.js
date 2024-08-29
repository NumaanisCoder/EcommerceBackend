const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    issue: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
