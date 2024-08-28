const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
    return: { type: mongoose.Schema.Types.ObjectId, ref: 'Return', required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Refund', refundSchema);
