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
mongoose.connect('mongodb://localhost/contacts')
  .then(() => console.log('MongoDB has started ...'))
  .catch(e => console.log(e))


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// use morgan to log requests to the console
app.use(morgan('dev'))


// =======================
// routes ================
// =======================

// basic route
app.get('/', (req, res) => res.send('Hello World!'))

//CONTACT ACTIONS
// list of contacts
app.post('/list', function (req, res) {
  const pageNumber = req.body.pageNumber
  const contactsPerPage = 10
  Contact.find({})
    .skip(pageNumber > 0 ? ((pageNumber - 1) * contactsPerPage) : 0)
    .limit(contactsPerPage)
    .then(contacts => {
      // Presenter
      const contactsToPresent = contacts.map(contact => {
        return {
          id: contact._id,
          name: contact.name,
          surname: contact.surname,
          middlename: contact.middlename,
          birthday: contact.birthday,
          gender: contact.gender,
          family: contact.family,
          country: contact.country,
          city: contact.city,
          zip: contact.zip,
          address: contact.address,
          email: contact.email,
          website: contact.website,
          job: contact.job,
          about: contact.about,
        }
      })
      const json = JSON.stringify(contactsToPresent)
      res.send(contactsToPresent)
      console.log(contactsToPresent)
    })
})

// list of contacts after search
app.post('/search', function (req, res) {
  console.log(req.body)
  Contact.find(
    req.body.contact,
    function () {
    },
  )
    .then(contacts => {
      // Presenter
      const contactsToPresent = contacts.map(contact => {
        return {
          id: contact._id,
          name: contact.name,
          surname: contact.surname,
          middlename: contact.middlename,
          birthday: contact.birthday,
          gender: contact.gender,
          family: contact.family,
          country: contact.country,
          city: contact.city,
          zip: contact.zip,
        }
      })
      // const json = JSON.stringify(contactsToPresent)
      res.send(contactsToPresent)
    })
})

// create contact
app.post('/create', function (req, res) {
  console.log(req.body.contact.id)
  if (req.body.contact.id) {
    const contact = new Contact({
      _id: req.body.contact.id,
    })
    Contact.findOneAndUpdate(contact._id, {
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
        },
      },
      { new: true }, function (err, contact) {
        if (err) return handleError(err)
        res.send(contact)
        console.log('contact', contact)
      })
  } else {
    const contact = new Contact({
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
    })
    contact.save()
      .then(contact => {
        console.log(contact)
      })
      .catch(e => console.log(e))
    res.send(contact)
    // console.log('contact', contact)
  }
})

// update contact
app.post('/update', function (req, res) {
  const contact = new Contact({
    _id: req.body.contact.id,
  })
  Contact.findOneAndUpdate(contact._id, {
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
      },
    },
    { new: true }, function (err, contact) {
      if (err) return handleError(err)
      res.send(contact)
    })
})

// delete contact
app.post('/delete', function (req, res) {
  const contact = new Contact({
    id: req.body.contactId,
  })
  Contact.find({
    _id: contact.id,
  })
    .deleteOne().then(_ => console.log('Removed'))
  res.send('Successfully removed')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
