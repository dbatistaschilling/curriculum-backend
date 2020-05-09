const { body } = require('express-validator');
const bcrypt = require('bcryptjs')
const User = require('../../models/user');

exports.login = [
    body('email')
    .exists().withMessage('email not sent by the frontend')
    .notEmpty().withMessage('Email is empty')
    .bail(),

    body('password')
    .exists().withMessage('password not sent by the frontend')
    .notEmpty().withMessage('Password is empty')
    .bail()
]

exports.signup = [
    body('name')
    .exists().withMessage('name not sent by the frontend')
    .notEmpty().withMessage('Name is empty')
    .isString().withMessage('Invalid name input!')
    .custom((value, { req }) => {
        if (value.includes('test')){
            throw new Error('Test name is forbidden!');
        }
        return true;
    })
    .bail()
    .trim(),

    body('email')
    .exists().withMessage('email not sent by the frontend')
    .notEmpty().withMessage('Email is empty')
    .isEmail().withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
        if (value.includes('test.com')){
            throw new Error('This email is forbidden!');
        }
        return true;
    })
    .bail()
    .custom((value, { req }) => {
        return User.findOne({ email: value })
            .then(user => {
                if (user) {
                    return Promise.reject('E-Mail already registered!');
                }
        })
    })
    .bail()
    .normalizeEmail()
    .trim(),

    body('password')
    .exists().withMessage('password not sent by the frontend')
    .notEmpty().withMessage('Password is empty')
    .isLength({ min: 5 }).withMessage('Password takes at least 5 characters')
    .isAlphanumeric().withMessage('Invalid password input')
    .trim()
    .bail(),

    body('confirmPassword')
    .exists().withMessage('confirmPassword not sent by the frontend')
    .custom((value, { req }) => {
        if (value !== req.body.password){
            throw new Error('Passwords don\'t match!');
        }
        return true;

    })
    .bail()
]
// 
// .custom((value, { req }) => {
//     return User.findOne({ email: value })
//       .then(userDoc => {
//           if (userDoc) {
//           return Promise.reject('E-Mail address already exists!');
//           }
//       });
//   })
// body('name')
// .trim()
// .not()
// .isEmpty()