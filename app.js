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

// display contact
app.get('/display', function (req, res) {
  const contact = {
    name: 'Petrov',
    surname: 'Sergei',
    middlename: 'Ivanovich',
    birthday: 'Sep 26 2018',
    gender: 'Male',
    family: 'Single',
    country: 'Belarus',
    city: 'Minsk',
    zip: '110000',
    address: 'Valenova 37-4/1',
    email: 'testmail@mail.com',
    website: 'testsite',
    job: 'Programmer',
    about: 'Programming 99 years',
  }
  console.log(contact)
  res.send(contact)
})

// list of contacts
app.get('/list', function (req, res) {
  Contact.find({})
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
      // const json = JSON.stringify(contactsToPresent)
      res.send(contactsToPresent)
      console.log(contactsToPresent)
    })
})


// create contact
app.post('/create', function (req, res) {
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
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
