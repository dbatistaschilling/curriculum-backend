const express = require('express');
const userController = require('../controllers/user');
const isAuth = require('../middlewares/is-auth');
const router = express.Router();

// GET /users
router.get('/users', userController.getAllUsers);
// GET /current-user
router.get('/current-user', isAuth, userController.getCurrentUser);
//GET /user-profiles
router.get('/user-profiles', isAuth, userController.getUserProfiles);
// DELETE /user
router.delete('/user/:userId', userController.deleteUser);

module.exports = router;