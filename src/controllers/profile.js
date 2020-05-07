const Profile = require('../models/profile');

const validationResult = require('../utils/validation-result');
const profileUpdate = require('../utils/profile/profile-update');

exports.createProfile = (req, res, next) => {
    validationResult(req);
    const params = req.body;
    const profile = new Profile(params);
    profile.save().then(profile => {
        res.status(201).json({
            message: 'Profile created!',
            profile
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getAllProfiles = (req, res, next) => {
    
    Profile.find({}).then(profiles => {
        if (!profiles) {
            const error = new Error('Could not find profiles.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Fetched all profiles', profiles });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.getProfile = (req, res, next) => {
    const profileId = req.params.profileId;
    Profile.findById(profileId).then(profile => {
        if (!profile) {
            const error = new Error('Could not find profile.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Fetched profile by ID', profile });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })

}

exports.updateProfile = (req, res, next) => {
    validationResult(req);
    const profileId = req.params.profileId;
    const params = req.body;
    Profile.findById(profileId).then(profile => {
        if (!profile) {
            const error = new Error('Could not find profile.');
            error.statusCode = 404;
            throw error;
        }
        
        profile = profileUpdate(profile, params);
        return profile.save();
    })
    .then(result => {
        res.status(200).json({ message: 'Profile updated!', result });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

}

exports.deleteProfile = (req, res, next) => {
    const profileId = req.params.profileId;
    Profile.findById(profileId).then(profile => {
        if (!profile) {
            const error = new Error('Could not find profile.');
            error.statusCode = 404;
            throw error;
        }
        return Profile.findOneAndDelete(profileId);
    })
    .then(result => {
        res.status(200).json({ message: 'Profile deleted!' });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}