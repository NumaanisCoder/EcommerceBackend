const mongoose = require('mongoose');

const shippingCarrierSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('ShippingCarrier', shippingCarrierSchema);
