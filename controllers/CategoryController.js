const Category = require("../models/Category");

const SubCategory = require("../models/Subcategory");
const { asyncErrorHandler, ErrorHandler } = require("../utils/ErrorHandler");


module.exports.createCategory = asyncErrorHandler(async (req,res,next)=> {

    const {name} = req.body;
    console.log("Category name is" , name)
    const existingCategory = await Category.find({name: name});

    if(existingCategory){
        return next(new ErrorHandler(400, "Same Category Already Exist"))
    }
    
    const newCategory = await Category({name});

    await newCategory.save();

    res.status(201).json({
        success: true,
        category: newCategory
    })
})

module.exports.createSubCategory = asyncErrorHandler(async (req,res,next) => {
    const {name, parentCategory} = req.body;


    const parentCategoryDoc = await Category.findOne({name: parentCategory})
    if(!parentCategoryDoc){
        return next(new ErrorHandler(400, "Parent Category Not Found"))
    }
    const existingSubCategory = await SubCategory.findOne({name: name, parentCategory: parentCategoryDoc._id});

    if(existingSubCategory){
        return next(new ErrorHandler(400, "Same SubCategory Already Exist for Parent Category"))
    }

  
    const newSubCategory = new SubCategory({name});

    newSubCategory.parentCategory = parentCategoryDoc._id;
    await newSubCategory.save();

    parentCategoryDoc.subcategories.push(newSubCategory._id);
    await parentCategoryDoc.save();

    res.status(201).json({
        success: true,
        Subcategory: newSubCategory
    })

})

module.exports.getCategory = asyncErrorHandler(async (req,res,next) => {

    const allcategories = await Category.find({}).populate('subcategories');

    res.status(200).json({
        success: true,
        Categories: allcategories
    })
})
