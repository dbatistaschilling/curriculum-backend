const express = require('express');
const profileController = require('../controllers/profile');
const {name, job, phone, email, address, birth, birthAddress, description} = require('../utils/profile/profile-validations');

const router = express.Router();
// POST /profile
router.post('/profile', 
    [name, job, phone, email, address, birth, birthAddress, description],
    profileController.createProfile);
// GET /profiles
router.get('/profiles', profileController.getAllProfiles);
// GET /profile/:profileId
router.get('/profile/:profileId', profileController.getProfile);
// PATCH /profile/:profileId
router.patch('/profile/:profileId',
    [name, job, phone, email, address, birth, birthAddress, description],
    profileController.updateProfile);
// DELETE /profile/:profileId
router.delete('/profile/:profileId', profileController.deleteProfile);

module.exports = router;