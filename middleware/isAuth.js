const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
//   const bearerHeader = req.headers["Authorization"]
//   console.log(bearerHeader)
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    const error = new Error('Not Authenticated')
    error.statusCode = 401
    throw error
  }
  const token = authHeader.split(' ')
  let decodedToken
  try {
    decodedToken = jwt.verify(token[0], process.env.JWT_SECRET_KEY)
  } catch (err) {
    err.statusCode = 500
    throw err
  }
  if (!decodedToken) {
    const error = new Error('Not Authenticated')
    error.statusCode = 401
    throw error
  }
  next()
}
