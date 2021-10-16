const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const sendMail = require('./sendMail')
const { validationResult } = require('express-validator')
const validateContact = require('./validation/contact')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.post('/contact', validateContact, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { subject, name, email, message } = req.body
  sendMail(subject, name, email, message)
    .then(() => {
      return res.status(200).json({ message: 'Message sent sucessfully!' })
    })
    .catch((error) => {
      return res.status(500).json({ message: 'something went wrong!' })
    })
})

app.use((req, res) => {
  return res.status(404).send('Page not found')
})
module.exports = app
