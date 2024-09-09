const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category"
  }
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
