const ProductCategoryModel = require('../models/productCategoryModel')
const User = require('../models/UserModel')

exports.addProductCategory = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username })
  const newProduct = new ProductCategoryModel({
    productCategoryName: req.body.Category,
    productCategoryImage: req.file.path
  })
  try {
    if (!user.isAdmin) {
      const error = new Error('Unauthorized')
      console.log(error)
      error.statusCode = 401
      throw error
    }
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
  const user = await User.findOne({ username: req.body.username })

  const categoryId = req.params.categoryId
  try {
    if (!user.isAdmin) {
      const error = new Error('Unauthorized')
      console.log(error)
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
  const categoryId = req.params.categoryId
  console.log(req.body.category)
  console.log('adding prod', req.file.path)
  console.log(categoryId)
  if (!req.body.category == null && req.file.path == null) {
    const error = new Error('Enter Valid Product Image and Name')
    error.statusCode = 404
    throw error
  }
  try {
    await ProductCategoryModel.findByIdAndUpdate(categoryId, { productCategoryName: req.body.category },
      function (err, docs) {
        console.log('this id docs and error')
        if (err) {
          const error = new Error('Product Category Unable to Update')
          error.statusCode = 404
          throw error
        } else {
          console.log('Updated ProductCategory : ', docs)
        }
      }).clone().catch((err) => console.log(err))

    res.status(200).json({
      message: 'Updated Product Category'
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    console.log('error of acatch bolock', err)
    next(err)
  }
}
// const clearImage = (filePath) => {
//   filePath = path.join(__dirname, '..', filePath)
//   fs.unlink(filePath, (err) => console.log(err))
// }
