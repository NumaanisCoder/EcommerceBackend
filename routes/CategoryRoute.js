const express = require('express');
const { createCategory, createSubCategory, getCategory } = require('../controllers/CategoryController');


const router = express.Router();


router.route("/createcategory").post(createCategory);
router.route("/createsubcategory").post(createSubCategory);
router.route("/getcategory").get(getCategory);






module.exports = router;