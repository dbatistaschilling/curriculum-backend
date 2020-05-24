const { body } = require('express-validator');

module.exports = [

    body('title')
    .exists().withMessage('title not sent by the frontend')
    .notEmpty().withMessage('title is required')
    .isString().withMessage('title is a string text')
    .trim(),

    body('courseSituation')
    .optional()
    .isString().withMessage('courseSituation is a string text')
    .trim(),

    body('status')
    .optional()
    .isString().withMessage('status is a string text')
    .trim(),

    body('url')
    .optional()
    .isURL().withMessage('url is invalid')
    .trim(),

    body('level')
    .optional()
    .isNumeric().withMessage('level is a number')
    .trim(),

    body('initialDate')
    .optional()
    .isISO8601().withMessage('initialDate has Date ISO8601 format')
    .trim(),

    body('finalDate')
    .optional()
    .isISO8601().withMessage('finalDate has Date ISO8601 format')
    .trim(),

    body('duration')
    .optional()
    .isNumeric().withMessage('duration is a number')
    .trim(),

    body('address')
    .optional()
    .isString().withMessage('address is a string text')
    .trim(),

    body('note')
    .optional()
    .isString().withMessage('note is a string text')
    .trim(),
]