const mongoose = require('mongoose')
const ProductCategorySchema = new mongoose.Schema({
  productCategoryName: { type: String, required: true, unique: true },
  productCategoryImage: { type: String, required: true }
}, {
  timestamps: true
})
module.exports = mongoose.model('ProductCategory', ProductCategorySchema)
