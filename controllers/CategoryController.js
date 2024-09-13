const Category = require("../models/Category");
const SubCategory = require("../models/Subcategory");
const { asyncErrorHandler, ErrorHandler } = require("../utils/ErrorHandler");


module.exports.createCategory = asyncErrorHandler(async (req,res,next)=> {

    const {name} = req.body;
    // console.log("Category name is" , name)

    const existingCategory = await Category.findOne({name: name});
    if(existingCategory){
        return next(new ErrorHandler(400, "Category Already Exist!"))
    }
    
    const newCategory = await Category({name});
    await newCategory.save();

    res.status(201).json({
        success: true,
        category: newCategory
    })
})

module.exports.createSubCategory = asyncErrorHandler(async (req,res,next) => {
    const {name, categoryID} = req.body;


    const parentCategoryDoc = await Category.findOne({_id: categoryID})
    if(!parentCategoryDoc){
        return next(new ErrorHandler(400, "Category Not Found!"));
    }

    const existingSubCategory = await SubCategory.findOne({name: name});
    if(existingSubCategory){
        return next(new ErrorHandler(400, "Subcategory Already Exist!"))
    }

  
    const newSubCategory = new SubCategory({name});
    newSubCategory.categoryID = parentCategoryDoc._id;
    await newSubCategory.save();

    /* 
    ------------------
    We don't need to save subCategory ObjectID into category document.
    ------------------

    parentCategoryDoc.subcategories.push(newSubCategory._id);
    await parentCategoryDoc.save();

    */
    

    res.status(201).json({
        success: true,
        Subcategory: newSubCategory
    })

})

module.exports.getCategories = asyncErrorHandler(async (req,res,next) => {

    const result = await Category.aggregate([
        {
            $lookup:{
                from: "subcategories",
                localField:"_id",
                foreignField:"categoryID",
                as:"subCategories"
            }
        }
    ]);

    res.status(200).json({
        success: true,
        categories: result
    })
})
