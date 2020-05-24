const { body } = require('express-validator');

module.exports = [
    body('category')
    .exists().withMessage('Category not sent by the frontend')
    .notEmpty().withMessage('Category is required')
    .isString().withMessage('Category is a string text')
    .isLength({ min: 3 }).withMessage('Invalid category')
    .trim(),
]