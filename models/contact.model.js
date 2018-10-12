const mongoose = require('mongoose')
const Schema = mongoose.Schema

let contactSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  middlename: {
    type: String,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: String,
    default: false,
  },
  family: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  zip: {
    type: Number,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  job: {
    type: String,
  },
  about: {
    type: String,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  phones: {
    type: [Number],
  },
})

mongoose.model('contacts', contactSchema)
