const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    reason: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Return', returnSchema);
