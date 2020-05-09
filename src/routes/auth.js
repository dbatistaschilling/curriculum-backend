const express = require('express');
const User = require('../models/user');
const authController = require('../controllers/auth');
const {login, signup} = require('../utils/user/user-validations');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.post('/signup', signup, authController.signup);

router.post('/login', login, authController.login);

router.post('/logout', isAuth, authController.logout);

module.exports = router;