// =======================
// get the packages we need ============
// =======================
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
require('./models/contact.model')
const Contact = mongoose.model('contacts')
// =======================
// configuration =========
// =======================

// connect to database
const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost/contacts')
    console.log('MongoDB has started ...')
  } catch (err) {
    console.log(err)
  }
}
connectToDb()

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// use morgan to log requests to the console
app.use(morgan('dev'))

// =======================
// routes ================
// =======================

//CONTACT ACTIONS
// list of contacts
app.post('/list', function (req, res) {
  const pageNumber = req.body.pageNumber
  const contactsPerPage = 10
  Contact.find({})
    .skip(pageNumber > 0 ? ((pageNumber - 1) * contactsPerPage) : 0)
    .limit(contactsPerPage)
    .then(contacts => {
      res.send(contacts)
      console.log(contacts)
    })
})

// list of contacts after search
app.post('/search', function (req, res) {
  console.log(req.body)
  Contact.find(req.body.contact)
    .then(contacts => {
      console.log('contacts', contacts)
      res.send(contacts)
    })
})

// create or update contact
app.post('/create', function (req, res) {
  console.log('req.body.contact._id', req.body.contact._id)
  if (req.body.contact._id) {
    Contact.findOneAndUpdate({ _id: req.body.contact._id }, {
        $set: {
          name: req.body.contact.name,
          surname: req.body.contact.surname,
          middlename: req.body.contact.middlename,
          birthday: req.body.contact.birthday,
          gender: req.body.contact.gender,
          family: req.body.contact.family,
          country: req.body.contact.country,
          city: req.body.contact.city,
          zip: req.body.contact.zip,
          address: req.body.contact.address,
          email: req.body.contact.email,
          website: req.body.contact.website,
          job: req.body.contact.job,
          about: req.body.contact.about,
          phones: req.body.contact.phones,
        },
      },
      { new: true },
      function (err, contact) {
        if (err) return console.log('err', err)
        res.send(contact)
        console.log('contact', contact)
      })
  } else {
    const contact = new Contact(req.body.contact)
    contact.save()
      .then(contact => {
        res.send(contact)
      })
      .catch(e => console.log(e))
  }
})

// delete contact
app.post('/delete', function (req, res) {
  Contact.find({
    _id: req.body.id,
  })
    .deleteOne()
    .then(_ => console.log('Removed'),
      res.send('Successfully removed'),
    )
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
