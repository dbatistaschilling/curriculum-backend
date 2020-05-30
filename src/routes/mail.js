const express = require('express');
const mailController = require('../controllers/mail');
const mailValidations = require('../utils/mail/mail-validations');
const router = express.Router();

// POST /client-email
router.post('/client-email', mailValidations, mailController.clientEmail);

module.exports = router;