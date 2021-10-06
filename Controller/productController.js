const ProductCategoryModel = require('../models/productCategoryModel')

// const fs = require('fs')
// const path = require('path')

exports.addProduct = async (req, res, next) => {
  const newProduct = new ProductCategoryModel({
    productCategoryName: req.body.Category,
    productCategoryImage: req.file.path
  })

  try {
    const savedProduct = await newProduct.save()
    res.json({
      productCategoryName: savedProduct.productCategoryName,
      productCategoryImage: savedProduct.productCategoryImage
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
exports.productCategories = async (req, res, next) => {
  try {
    const productCategories = await ProductCategoryModel.find()
    res.status(200).json(productCategories)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
