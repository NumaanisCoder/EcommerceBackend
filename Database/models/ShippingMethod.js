const mongoose = require('mongoose');

const shippingMethodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    carrier: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingCarrier', required: true }
});

module.exports = mongoose.model('ShippingMethod', shippingMethodSchema);
