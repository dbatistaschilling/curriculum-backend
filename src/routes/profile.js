const express = require('express');
const profileController = require('../controllers/profile');

const router = express.Router();

router.post('profile', profileController.createProfile);
router.get('profiles', profileController.getAllProfiles);
router.get('profile/profileId', profileController.getProfile);
router.delete('profile/profileId', profileController.deleteProfile);
router.patch('profile/profileId', profileController.updateProfile);