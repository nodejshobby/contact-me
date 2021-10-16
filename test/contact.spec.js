require('dotenv').config()
const supertest = require('supertest')
const assert = require('assert')
const app = require('../src/app')
const sendMail = require('../src/sendMail')

describe('GET /', function () {
  it('it should return status code 200', function (done) {
    supertest(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })
})

describe('POST /contact', function () {
  it('POST /contact return status 200 and expected message', function (done) {
    supertest(app)
      .post('/contact')
      .send({
        name: 'Yekinni Basiru',
        email: 'Kolawole@gmail.com',
        subject: 'Kind of greeting',
        message: 'Well done oooh!',
      })
      .expect(200)
      .expect({ message: 'Message sent sucessfully!' })
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })

  it('it shoud return status code 400 if we dosent send anything', function (done) {
    supertest(app)
      .post('/contact')
      .send({})
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })
})

describe('* Not found', function () {
  it('should return a not found message', function (done) {
    supertest(app)
      .get('/404')
      .expect(404)
      .expect('Page not found')
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })
})

describe('*Mail unit test', function () {
  it('should return error', function (done) {
    sendMail(
      'Running test',
      'nodejshobby',
      'bademail',
      'I am ready for any work',
    ).catch((error) => {
      done()
    })
  })

  it('should pass the test', function (done) {
    sendMail(
      'Running test',
      'nodejshobby',
      'hobbyman@gmail.com',
      'I am ready for any work',
    )
      .then(() => {
        done()
      })
      .catch((error) => {
        done(error)
      })
  })
})
