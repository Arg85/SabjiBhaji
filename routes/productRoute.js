const productController = require('../Controller/productController')
const isAuth = require('../middleware/isAuth')
const multer = require('multer')
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }
})
const upload = multer({
  storage: fileStorageEngine
})
const router = require('express').Router()

router.post('/productCategory', isAuth, upload.single('image'), productController.addProductCategory)
router.delete('/productCategory/:categoryId', isAuth, productController.deleteProductCategory)
router.put('/productCategory/:categoryId', isAuth, upload.single('image'), productController.updateProductCategory)
router.post('/seed/product', isAuth, upload.single('image'), productController.addProduct)
router.get('/productCategory', productController.productCategories)

module.exports = router
