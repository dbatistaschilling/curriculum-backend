const express = require('express');
const profileController = require('../controllers/profile');
const profile = require('../utils/profile/profile-validations');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();
// POST /profile
router.post('/profile', isAuth, profile, profileController.createProfile);
// GET /profiles
router.get('/profiles', profileController.getAllProfiles);
// GET /profile/:profileId
router.get('/profile/:profileId', profileController.getProfile);
// PATCH /profile/:profileId
router.patch('/profile/:profileId', isAuth, profile, profileController.updateProfile);
// DELETE /profile/:profileId
router.delete('/profile/:profileId', isAuth, profileController.deleteProfile);
// POST /profile/update-status/:profileId
router.patch('/profile/update-status/:profileId', isAuth, profileController.activateStatus);
// GET /profile/active
router.get('/profile-active', profileController.getActiveProfile)

module.exports = router;