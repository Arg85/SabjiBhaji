module.exports = authorize

function authorize (req, res, next) {
  const authorizeHeader = req.get('isAdmin')
  console.log(authorizeHeader)
  if (authorizeHeader !== true && authorizeHeader === '') {
    console.log('asdas')
    res.status(401).send({ message: 'Unuthorized' })
  }
  next()
}
