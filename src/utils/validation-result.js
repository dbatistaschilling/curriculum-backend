const { validationResult } = require('express-validator');

module.exports = (req) => {
    const inputValidation = validationResult(req);
    if (!inputValidation.isEmpty()) {
        const errors = inputValidation.array()[0];
        const error = new Error(errors.msg)
        error.statusCode = 422;
        throw error;
    }

}