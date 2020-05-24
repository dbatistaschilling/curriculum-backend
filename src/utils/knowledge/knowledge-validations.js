const { body } = require('express-validator');

module.exports = [

    body('title')
    .exists().withMessage('Description title not sent by the frontend')
    .notEmpty().withMessage('Description title is required')
    .isString().withMessage('Description title is a string text')
    .trim(),

    body('courseSituation')
    .exists().withMessage('Description courseSituation not sent by the frontend')
    .isString().withMessage('Description courseSituation is a string text')
    .trim(),

    body('status')
    .exists().withMessage('Description status not sent by the frontend')
    .isString().withMessage('Description status is a string text')
    .trim(),

    body('url')
    .exists().withMessage('Description url not sent by the frontend')
    .isURL().withMessage('Description url is invalid')
    .trim(),

    body('level')
    .exists().withMessage('Description level not sent by the frontend')
    .isNumeric().withMessage('Description level is a number')
    .trim(),

    body('initialDate')
    .exists().withMessage('Description initialDate not sent by the frontend')
    .isISO8601().withMessage('initialDate has Date ISO8601 format')
    .trim(),

    body('finalDate')
    .exists().withMessage('Description finalDate not sent by the frontend')
    .isISO8601().withMessage('finalDate has Date ISO8601 format')
    .trim(),

    body('duration')
    .exists().withMessage('Description duration not sent by the frontend')
    .isNumeric().withMessage('Description duration is a number')
    .trim(),

    body('address')
    .exists().withMessage('Description address not sent by the frontend')
    .isString().withMessage('Description address is a string text')
    .trim(),

    body('note')
    .exists().withMessage('Description note not sent by the frontend')
    .isString().withMessage('Description note is a string text')
    .trim(),
]