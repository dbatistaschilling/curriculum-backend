const { body } = require('express-validator');
const bcrypt = require('bcryptjs')
const User = require('../../models/user');


const mailValidations = [

    body('firstName')
    .exists().withMessage('firstName not sent by the frontend')
    .notEmpty().withMessage('Your first name is empty')
    .isLength({min: 3}).withMessage('Invalid name')
    .bail(),

    body('lastName')
    .exists().withMessage('lastName not sent by the frontend')
    .notEmpty().withMessage('Your last name is empty')
    .isLength({min: 3}).withMessage('Invalid last name')
    .bail(),

    body('subject')
    .exists().withMessage('subject not sent by the frontend')
    .notEmpty().withMessage('Subject is empty')
    .isLength({min: 3}).withMessage('Invalid message')
    .bail(),

    body('email')
    .exists().withMessage('email not sent by the frontend')
    .notEmpty().withMessage('Email is empty')
    .isEmail().withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
        if (value.includes('test.com')){
            throw new Error('Please enter a valid email.');
        }
        return true;
    }),

    body('message')
    .exists().withMessage('message not sent by the frontend')
    .notEmpty().withMessage('Your message is empty')
    .isLength({ min: 20 }).withMessage('To short message')
    .bail(),

]

module.exports = mailValidations;