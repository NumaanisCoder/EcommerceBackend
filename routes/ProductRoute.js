const express = require('express');
const {createProduct, getproducts} = require('../controllers/ProductController');

const router = express.Router();





router.route("/createproduct").post(createProduct);
router.route("/getproducts").get(getproducts);




module.exports = router;