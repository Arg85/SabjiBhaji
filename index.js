const express = require('express')
const app = express()
const cors = require('cors')
// const multer = require('multer')
// const GridFsStorage = require('multer-gridfs-storage')
// const Grid = require('gridfs-stream')
// const methodOverride = require('method-override')
const userRoute = require('./routes/user')
const productRoute = require('./routes/productRoute')
const authRoute = require('./routes/auth')
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
const mongoose = require('mongoose')
app.use(cors())

app.use('/images', express.static('images'))
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/product', productRoute)

app.get('/', (req, res) => {
  res.send('hello world')
})
app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  const errorData = error.data
  res.status(status).json({ message: message, error: errorData })
})
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('db connection successful')

  app.listen(4000, () => {
    const PORT = process.env.PORT || 4000
    console.log(`server running at ${PORT}`)
  })
}).catch((err) => {
  console.log(err)
})
