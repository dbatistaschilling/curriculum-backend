const Profile = require('../models/profile');

const validationResult = require('../utils/validation-result');
const profileUpdate = require('../utils/profile/profile-update');
const deleteFile = require('../utils/delete-file');
const clientQueries = require('../utils/client-queries');

const User = require('../models/user');

exports.createProfile = (req, res, next) => {
    validationResult(req);
    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path;
    const params = req.body;
    params.imageUrl = imageUrl;
    const profile = new Profile(params);
    
    User.findOne({_id: req.userId})
        .then(user => {
            profile.owner = user._id;
            return profile.save();
        })
        .then(profile => {
            return Profile.find({ _id: { $ne: profile._id } })
        })
        .then(allOtherProfiles => {
            if (allOtherProfiles){
                return Promise.all(allOtherProfiles.map(p => {
                    p.status = 'Desactivated';
                    return p.save();
                })).then(updatedProfile => {
                    return updatedProfile;
                });
            }
            return profile;
        })
        .then(allOtherProfiles => {
            res.status(201).json({
                message: 'Profile created!',
                profile
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            err.param = 'server';
            next(err);
        });
}

exports.getAllProfiles = (req, res, next) => {
    const [match, page, perPage, sortby] = clientQueries(req);
    Profile.find( match )
        .skip((+page * +perPage) - +perPage)
        .limit(+perPage)
        .sort({[sortby[0]]: sortby[1] })
        .then(profiles => {
            if (!profiles || profiles.length === 0) {
                const error = new Error('Could not find any profiles.');
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
        });
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

exports.getActiveProfile = (req, res, next) => {    
    Profile.findOne({status: 'Active'}).then(profile => {
        if (!profile) {
            const error = new Error('Could not find profile.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Fetched profile by Status', profile });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.param = 'server';
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
        profile = profileUpdate(profile, params, req);
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
            error.param = 'profile';
            throw error;
        }
        deleteFile(profile.imageUrl, next);
        return Profile.findOneAndDelete({_id: profileId});
    })
    .then(result => {
        res.status(200).json({ message: 'Profile deleted!' });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.param = 'server';
        next(err);
    });
}

exports.activateStatus = (req, res, next) => {
    const profileId = req.params.profileId;
    let updatedProfile;
    Profile
        .findById(profileId)
        .then(profile => {
            if (!profile){
                const error = new Error('Could not find profile.');
                error.statusCode = 404;
                error.param = 'profile';
                throw error;
            }
            if (profile.status === 'Active'){
                const error = new Error('Profile is already active.');
                error.statusCode = 404;
                error.param = 'profile';
                throw error;
            }
            profile.status = 'Active';
            updatedProfile = profile;
            return updatedProfile.save();
        })
        .then(p => {
            return Profile.find({ _id: { $ne: p._id } })
        })
        .then(allOtherProfiles => {
            if (allOtherProfiles){
                return Promise.all(allOtherProfiles.map(p => {
                    p.status = 'Desactivated';
                    return p.save();
                })).then(updatedProfile => {
                    return updatedProfile;
                });
            }
            return profile;
        })
        .then(allOtherProfiles => {
            res.status(201).json({
                message: 'Profile created!',
                updatedProfile
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            err.param = 'server';
            next(err);
        });
}