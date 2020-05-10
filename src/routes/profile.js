const express = require('express');
const profileController = require('../controllers/profile');
const profile = require('../utils/profile/profile-validations');
const isAuth = require('../middlewares/is-auth');
// const {sharpMethod} = require('../middlewares/images');

const router = express.Router();
// POST /profile
router.post('/profile', isAuth, profile, profileController.createProfile);
// GET /profiles
router.get('/profiles', isAuth, profileController.getAllProfiles);
// GET /profile/:profileId
router.get('/profile/:profileId', isAuth, profileController.getProfile);
// PATCH /profile/:profileId
router.patch('/profile/:profileId', isAuth, profile, profileController.updateProfile);
// DELETE /profile/:profileId
router.delete('/profile/:profileId', isAuth, profileController.deleteProfile);

module.exports = router;