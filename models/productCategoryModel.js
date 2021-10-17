const mongoose = require('mongoose')
// const ProductModel = require('./productModel')
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true, unique: true },
  productImage: { type: String },
  productPrice: { type: Number }

}, {
  timestamps: true
})
const ProductCategorySchema = new mongoose.Schema({
  productCategoryName: { type: String, required: true, unique: true },
  productCategoryImage: { type: String, required: true },
  products: [ProductSchema]
}, {
  timestamps: true
})
module.exports = mongoose.model('ProductCategory', ProductCategorySchema)
