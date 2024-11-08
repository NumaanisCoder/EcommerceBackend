const multer = require('multer');
const Product = require("../models/Product");
const ProductImage = require("../models/ProductImage"); // Assuming you have this model for storing image URLs
const { asyncErrorHandler, ErrorHandler } = require("../utils/ErrorHandler");
const Category = require('../models/Category');
const SubCategory = require('../models/Subcategory');
const { verifyToken } = require('../utils/TokenHandler');
const uploadImage = require('../utils/imagekit');
const { model } = require('mongoose');


// Configure multer to handle multiple image files
const upload = multer({
  storage: multer.memoryStorage(),
}).array('images', 10); // Allow up to 10 images

module.exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  if (req.method === "POST") {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "File upload error." });
      } else if (err) {
        return res.status(500).json({ message: "Internal server error." });
      }

      // Extract the fields from the request body
      const { name, category, subCategory, description, price, stocks, status, tokenOfSellerID } = req.body;
      console.log("req.body result =>", req.body);
      console.log("req.files result =>", req.files); // This should log an array of files

      // Check if product with the same name already exists
      const existingProduct = await Product.findOne({ name: name });
      if (existingProduct) {
        return next(new ErrorHandler(400, "Duplicate product name"));
      }

      // Validate the required fields
      if (!name || !category || !subCategory || !description || !price || !stocks || !status) {
        return next(new ErrorHandler(400, "Incomplete product information"));
      }

      // Handle multiple image uploads
      const imageFiles = req.files; // `req.files` contains the array of uploaded images

      if (!imageFiles || imageFiles.length === 0) {
        return next(new ErrorHandler(400, "No images provided"));
      }
      const categoryId = (await Category.findOne({name: category}))._id;
      const SubCategoryId = (await SubCategory.findOne({name: subCategory}))._id;


      const {decoded} = verifyToken(tokenOfSellerID);
      const {id} = decoded;
  

      // Create and save the new product first
      const product = new Product({
        name,
        description,
        price,
        category: categoryId,
        subCategory: SubCategoryId,
        stocks,
        status,
        sellerID: id,
      });

      await product.save();

      // Upload each image and store the URLs
      await Promise.all(
        imageFiles.map(async (imageFile) => {
          const imageUrl = await uploadImage(imageFile.buffer, imageFile.originalname);
          const newProductImage = new ProductImage({
            imageurl: imageUrl,
            product: product._id,
          });
          await newProductImage.save();
        })
      );

      // Send the response
      return res.status(200).json({
        product,
        success: true,
        message: "Product and images uploaded successfully.",
      });
    });
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
});


module.exports.getproducts = asyncErrorHandler(async (req, res, next) => {
  // 1. Fetch all products
  const products = await Product.find({})
    .populate('category')    // Populating categoryId field
    .populate('subCategory') // Populating subCategoryId field
    .exec();

  // 2. Fetch all images for each product
  const productsWithImages = await Promise.all(products.map(async (product) => {
    // Fetch images where product field matches the product._id
    const images = await ProductImage.find({ product: product._id }).sort({_id:-1});

    // Return product with associated images
    return {
      ...product.toObject(), // Convert mongoose document to plain JS object
      images: images, // Add images field with the respective product's images
    };
  }));

  // 3. Send the response
  res.json({
    success: true,
    products: productsWithImages
  });
});