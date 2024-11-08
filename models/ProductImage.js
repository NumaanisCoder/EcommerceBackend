const mongoose = require('mongoose');

const productImage = new mongoose.Schema({

    imageurl:{
        type: String
    },
    product: {
        type: mongoose.Types.ObjectId, ref:'Product'
    }

})

module.exports = mongoose.model("productImage", productImage);