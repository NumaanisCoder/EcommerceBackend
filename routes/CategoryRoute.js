const express = require('express');
const { createCategory, createSubCategory, getCategories } = require('../controllers/CategoryController');


const router = express.Router();


router.route("/createcategory").post(createCategory);
router.route("/createsubcategory").post(createSubCategory);
router.route("/getcategories").get(getCategories);






module.exports = router;