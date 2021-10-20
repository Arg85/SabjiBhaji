const ProductCategoryModel = require('../models/productCategoryModel')
const ProductModel = require('../models/productModel')
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
    const user = await User.findOne({ username: req.body.username })
    if (!user.isAdmin || user.isAdmin === 'false') {
      const error = new Error('Unauthorized')
      error.statusCode = 401
      throw error
    }// now try
    // if (user.isAdmin === 'false') {
    //   const error = new Error('Unauthorized')
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
    if (!err.statusCode) {
      const error = new Error('Product Category Could not be Added')
      error.statusCode = 401
      throw error
    }
    next(err)
  }

  // catch (err) {
  //   if (!err.statusCode) {
  //     const error = new Error('No product Found')
  //     error.statusCode = 401
  //     throw error
  //   }
  //   next(err)
}
exports.addProduct = async (req, res, next) => {
  const newProduct = new ProductModel({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productImage: req.file.path,
    productCategory: [req.params.categoryId]
  })
  try {
    const savedProduct = await newProduct.save()
    console.log(savedProduct)
    res.json({
      message: 'successs'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
exports.updateProduct = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username })
  try {
    if (!user.isAdmin || user.isAdmin === 'false') {
      const error = new Error('Unauthorized')
      error.statusCode = 401
      throw error
    }// now try
    const resy = await ProductModel.findByIdAndUpdate({ _id: req.params.productId }, { $set: { productPrice: req.body.productPrice } },
      function (err, docs) {
        if (err) {
          const error = new Error('Product Category Unable to Update')
          error.statusCode = 404
          throw error
        } else {
          console.log(docs)
        }
      }).clone().catch((err) => console.log(err))
    console.log(resy)
  } catch (err) {
    if (!err.statusCode) {
      const error = new Error('No product Found')
      error.statusCode = 401
      throw error
    }
    next(err)
  }
  res.status(200).json({ message: 'successfully udapted' })
}
exports.productCategories = async (req, res, next) => {
  try {
    const productCategories = await ProductCategoryModel.find()
    res.status(200).json(productCategories)
  } catch (err) {
    if (!err.statusCode) {
      const error = new Error('No product Found')
      error.statusCode = 401
      throw error
    }
    next(err)
  }
}
exports.allProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find().populate('productCategory')
    console.log(products)
    res.status(200).json(products)
  } catch (err) {
    if (!err.statusCode) {
      const error = new Error('No product Found')
      error.statusCode = 401
      throw error
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
    if (!user.isAdmin || user.isAdmin === 'false') {
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
  console.log(user.isAdmin)
  try {
    if (!user.isAdmin || user.isAdmin === 'false') {
      console.log('asd')
      const error = new Error('Unauthorized')
      error.statusCode = 401
      throw error
    }
    if (req.body.category == null && !req.file) {
      const error = new Error('Enter Valid Product Image and Name')
      error.statusCode = 404
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
