const express = require('express');
const User = require('../models/user');
const authController = require('../controllers/auth');
const {login, signup, forgotPassword, recoverPassword} = require('../utils/auth/auth-validations');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.post('/signup', signup, authController.signup);

router.post('/login', login, authController.login);

router.post('/logout', isAuth, authController.logout);

router.post('/forgot-password', forgotPassword,authController.forgotPassword);

router.post('/change-password', recoverPassword, authController.changePassword);

module.exports = router;