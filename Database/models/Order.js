const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    orderDate: { type: Date, required: true },
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingAddress', required: true },
    billingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'BillingAddress', required: true },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
    shipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    return: { type: mongoose.Schema.Types.ObjectId, ref: 'Return' },
});

module.exports = mongoose.model('Order', orderSchema);
