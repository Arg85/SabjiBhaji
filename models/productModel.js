const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true, unique: true },
  productImage: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productCategory: { type: mongoose.Types.ObjectId, ref: 'ProductCategory' }

}, {
  timestamps: true
})
module.exports = mongoose.model('Product', ProductSchema)

// productId: { type: String, required: true, unique: true },
// productImage: { type: String, required: true },
// productPrice: { type: Number, required: true },
