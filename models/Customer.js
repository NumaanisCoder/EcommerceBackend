const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    supportTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SupportTicket' }]
});

module.exports = mongoose.model('Customer', customerSchema);
