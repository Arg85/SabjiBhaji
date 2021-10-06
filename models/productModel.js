const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true, unique: true },
  productId: { type: String, required: true, unique: true },
  productImage: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productCategory: { type: String, required: true }

}, {
  timestamps: true
})
module.exports = mongoose.model('Product', ProductSchema)
