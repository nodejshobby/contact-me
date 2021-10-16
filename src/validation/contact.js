const { check } = require('express-validator')
module.exports = [
  check('email')
    .notEmpty()
    .bail()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Enter a valid email'),
  check('name').notEmpty().withMessage('Name cannot be empty'),
  check('subject').notEmpty().withMessage('Subject cannot be empty'),
  check('message')
    .notEmpty()
    .bail()
    .withMessage('Message cannot be empty')
    .isLength({ min: 10 })
    .withMessage('Message cannot be less than ten characters'),
]
