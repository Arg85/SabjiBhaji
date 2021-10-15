const ProductCategoryModel = require('../models/productCategoryModel')
const User = require('../models/UserModel')
const path = require('path')
const fs = require('fs')
exports.addProductCategory = async (req, res, next) => {
  // const user = await User.findOne({ username: req.body.username })
  const newProduct = new ProductCategoryModel({
    productCategoryName: req.body.Category,
    productCategoryImage: req.file.path
  })
  try {
    // if (!user.isAdmin || user.isAdmin == null) {
    //   const error = new Error('Unauthorized')
    //   console.log(error)
    //   error.statusCode = 401
    //   throw error
    // }
    const savedProduct = await newProduct.save()
    res.json({
      productCategoryName: savedProduct.productCategoryName,
      productCategoryImage: savedProduct.productCategoryImage,
      _id: newProduct._id
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
exports.addProduct = async (req, res, next) => {
  const newProduct = new ProductCategoryModel({
    productCategoryName: req.body.Category,
    productCategoryImage: req.file.path
  })
  try {
    const savedProduct = await newProduct.save()
    res.json({
      productCategoryName: savedProduct.productCategoryName,
      productCategoryImage: savedProduct.productCategoryImage,
      _id: newProduct._id
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
exports.deleteProductCategory = async (req, res, next) => {
  // console.log(req, 'jiii')
  const user = await User.findOne({ username: req.body.username })
  const categoryId = req.params.categoryId
  try {
    if (!user.isAdmin) {
      const error = new Error('Unauthorized')
      // console.log(error)
      error.statusCode = 401
      throw error
    }
    const category = await ProductCategoryModel.deleteOne({ categoryId })

    if (!category) {
      const error = new Error('Product Category Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      message: 'Deleted Product Category'
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
exports.updateProductCategory = async (req, res, next) => {
  // console.log(req.body.username)
  const user = await User.findOne({ username: req.body.username })
  const categoryId = req.params.categoryId
  // console.log(req.body.category)
  // console.log('adding prod', req.file.path)
  // console.log(user.isAdmin, 'addy hu')
  // console.log(categoryId)
  if (!req.body.category == null && req.file.path == null) {
    const error = new Error('Enter Valid Product Image and Name')
    error.statusCode = 404
    throw error
  }
  try {
    if (!user.isAdmin) {
      const error = new Error('Unauthorized')
      // console.log(error)
      error.statusCode = 401
      throw error
    }
    const imageUrl = await ProductCategoryModel.findById(categoryId)
    const resy = await ProductCategoryModel.findByIdAndUpdate(categoryId, { $set: { productCategoryName: req.body.categoryName, productCategoryImage: req.file.path } },
      function (err, docs) {
        // console.log('this id docs and error')
        if (err) {
          const error = new Error('Product Category Unable to Update')
          error.statusCode = 404
          throw error
        } else {
          // console.log('Updated ProductCategory : ', docs.productCategoryImage)
          clearImage(imageUrl.productCategoryImage)
          // console.log(imageUrl, 'imageurl')
          // console.log(imageUrl.productCategoryImage, 'I am product curr')
        }
      }).clone().catch((err) => console.log(err))

    res.status(200).json({
      message: 'Updated Product Category'
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    console.log('error of catch bolock', err)
    next(err)
  }
}
const clearImage = (filePath) => {
  console.log(filePath)
  filePath = path.join(__dirname, '..', filePath)
  console.log(filePath, 'filepath final')
  fs.unlink(filePath, function (err) {
    if (err) return console.log(err)
    console.log('file deleted successfully')
  })
}
