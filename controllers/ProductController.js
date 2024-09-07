const Product = require("../models/Product");
const Seller = require("../models/Seller");
const { asyncErrorHandler, ErrorHandler } = require("../utils/ErrorHandler");




module.exports.createProduct = asyncErrorHandler( async (req,res, next) => {

    const {name, category, subcategory, description, price, stocks, status, sellerid} = req.body;
    const existingProduct = await Product.find({name: name});
    if(existingProduct){
        return next(new ErrorHandler(400, "Duplicate product name"))
    }
    if(!name || !category || !subcategory || !description || !price || !stocks || !status ){
        return next(new ErrorHandler(400, "Incomplete product information"))
    }

    const product = new Product({name, category, subcategory, description, price, stocks, status});
    await product.save();

    res.json({
        product: product,
        success: true
    })


})