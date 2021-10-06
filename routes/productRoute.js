
const productController = require('../Controller/productController')
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

router.post('/seed', upload.single('image'), productController.addProduct)
router.get('/', productController.productCategories)

module.exports = router
