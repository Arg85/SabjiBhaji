const ProductCategoryModel = require('../models/productCategoryModel')
const User = require('../models/UserModel')
const path = require('path')
const fs = require('fs')
exports.addProductCategory = async (req, res, next) => {
  // const user = await User.findOne({ username: req.body.username })
  try {
    const newProduct = new ProductCategoryModel({
      productCategoryName: req.body.Category,
      productCategoryImage: req.file.path
    })
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
  // const ProductCategory = await ProductCategoryModel.findOne({ _id: req.params.categoryId })
  // console.log(ProductCategory, 'produ ch')
  // ProductCategory.products.productName : req.body.productName
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user.isAdmin) {
      const error = new Error('Unauthorized')
      error.statusCode = 401
      throw error
    }// now try

    const productCategory = await ProductCategoryModel.findOne({ _id: req.params.categoryId })
    productCategory.products.push({
      productName: req.body.productName,
      productImage: req.file.path,
      productPrice: req.body.productPrice
    })

    const updated = await productCategory.save()
    console.log(updated)
    res.status(200).json({ message: 'Succesfuly added product' })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await ProductCategoryModel.find({ _id: req.params.productId })
    console.log(product)
    res.status(200).json(product)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
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
  try {
    const user = await User.findOne({ username: req.body.username })
    const categoryId = req.params.categoryId
    console.log(categoryId, 'category id')
    if (!user.isAdmin) {
      const error = new Error('Unauthorized')
      error.statusCode = 401
      throw error
    }// now try

    const result = await ProductCategoryModel.findByIdAndDelete({ _id: categoryId }, (err, deldoc) => {
      if (err) {
        const error = new Error('Product Could not be found')
        error.statusCode = 401
        throw error
      }
    }).clone().catch((err) => console.log(err))
    res.status(200).json({
      message: 'Deleted Product Category'
    })
    clearImage(result.productCategoryImage)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
exports.updateProductCategory = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username })
  const categoryId = req.params.categoryId
  if (!req.body.category == null && req.file.path == null) {
    const error = new Error('Enter Valid Product Image and Name')
    error.statusCode = 404
    throw error
  }
  try {
    if (!user.isAdmin) {
      const error = new Error('Unauthorized')
      error.statusCode = 401
      throw error
    }
    const imageUrl = await ProductCategoryModel.findById(categoryId)
    const resy = await ProductCategoryModel.findByIdAndUpdate(categoryId, { $set: { productCategoryName: req.body.categoryName, productCategoryImage: req.file.path } },
      function (err, docs) {
        if (err) {
          const error = new Error('Product Category Unable to Update')
          error.statusCode = 404
          throw error
        } else {
          clearImage(imageUrl.productCategoryImage)
        }
      }).clone().catch((err) => console.log(err))

    res.status(200).json({
      message: 'Updated Product Category'
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath)
  fs.unlink(filePath, function (err) {
    if (err) return console.log(err)
    console.log('file deleted successfully')
  })
}
