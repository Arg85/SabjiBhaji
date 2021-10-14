// const generateToken = require('../utils.js')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)

  })

  try {
    const savedUser = await newUser.save()

    res.status(200).send({
      _id: newUser._id,
      name: savedUser.name,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      const error = new Error('User Does not exist')
      error.statusCode = 401
      throw error
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: jwt.sign({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        }, `${process.env.JWT_SECRET_KEY}`, {
          expiresIn: '30d'
        })
      })
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
