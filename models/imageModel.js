const mongoose = require('mongoose')
const ImageSchema = new mongoose.Schema({
  imageName: { type: String, required: true, unique: true },
  imagedesc: { type: String, required: true, unique: true },
  img: {
    data: Buffer,
    contentType: String
  }

}, {
  timestamps: true
})
module.exports = mongoose.model('ImageSchema', ImageSchema)
