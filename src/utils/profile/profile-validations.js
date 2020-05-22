const { body } = require('express-validator');

module.exports = [
    body('name')
    .exists().withMessage('Name not sent by the frontend')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name is a string text')
    .isLength({ min: 3 }).withMessage('Invalid Name')
    .trim(),

    body('job')
    .exists().withMessage('Job not sent by the frontend')
    .notEmpty().withMessage('Job is required')
    .isString().withMessage('Job is a string text')
    .trim(),

    body('phone')
    .exists().withMessage('Phone not sent by the frontend')
    .notEmpty().withMessage('Phone is required')
    .isMobilePhone("any").withMessage('Invalid phone')
    .trim(),

    body('email')
    .exists().withMessage('Email not sent by the frontend')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email')
    .custom((value, {req}) => {
        if (value.includes('test.com')) {
            throw new Error('This email address is forbidden.');
        }
        return true;
    })
    .normalizeEmail(),

    body('address.street')
    .exists().withMessage('Street not sent by the frontend')
    .notEmpty().withMessage('Street is required')
    .isString().withMessage('Street is a string text')
    .trim(),
    
    body('address.number')
    .exists().withMessage('Number not sent by the frontend')
    .notEmpty().withMessage('Number is required')
    .isNumeric().withMessage('Invalid number')
    .trim(),

    body('address.city')
    .exists().withMessage('City not sent by the frontend')
    .notEmpty().withMessage('City is required')
    .isString().withMessage('City is a string text')
    .trim(),

    body('address.complement')
    .exists().withMessage('Complement not sent by the frontend')
    .isString().withMessage('Complement is a string text')
    .trim(),

    body('address.postCode')
    .exists().withMessage('postCode not sent by the frontend')
    .notEmpty().withMessage('Post code is required')
    .isString().withMessage('Post code is a string text')
    .trim(),

    body('address.country')
    .exists().withMessage('Country not sent by the frontend')
    .notEmpty().withMessage('Country is required')
    .isString().withMessage('Country is a string text')
    .trim(),

    body('birth')
    .exists().withMessage('Birth not sent by the frontend')
    .notEmpty().withMessage('Birth is required')
    .isISO8601().withMessage('Birth has Date ISO8601 format')
    .trim(),

    body('birthAddress.city')
    .exists().withMessage('Birth city not sent by the frontend')
    .notEmpty().withMessage('Birth city is required')
    .isString().withMessage('Birth city is a string text')
    .trim(),

    body('birthAddress.state')
    .exists().withMessage('Birth state not sent by the frontend')
    .notEmpty().withMessage('Birth state is required')
    .isString().withMessage('Birth state is a string text')
    .isLength({ max: 2 }).withMessage('Birth state has 2 characters')
    .trim(),

    body('birthAddress.country')
    .exists().withMessage('Birth country not sent by the frontend')
    .notEmpty().withMessage('Birth country is required')
    .isString().withMessage('Birth country is a string text')
    .trim(),

    body('description')
    .exists().withMessage('Description not sent by the frontend')
    .isString().withMessage('Description is a string text')
    .trim()
]