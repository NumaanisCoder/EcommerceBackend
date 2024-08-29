const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    shippingMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingMethod', required: true },
    trackingNumber: { type: String, required: true }
});

module.exports = mongoose.model('Shipment', shipmentSchema);
