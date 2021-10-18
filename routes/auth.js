const router = require('express').Router()
const AuthController = require('../Controller/authController')
// REGISTER

router.post('/login', AuthController.login)
router.get('/', AuthController.allUsers)
router.post('/register', AuthController.register)
module.exports = router
