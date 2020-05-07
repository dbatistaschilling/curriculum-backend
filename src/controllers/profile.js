const Profile = require('../models/profile');

exports.createProfile = (req, res, next) => {
    const params = Object.keys(req.body);
    console.log(params);
    
    // const profile = new Profile({params});
    // profile.save().then(profile => {
    //     console.log(profile);
    //     res.status(201).json({
    //         message: 'Profile created!',
    //         profile
    //     });
    // }).catch(err => {
    //     if (!err.statusCode){
    //         err.statusCode = 500;
    //     }
    //     next(err);
    // });
}

exports.getAllProfiles = (req, res, next) => {

}

exports.getProfile = (req, res, next) => {

}

exports.deleteProfile = (req, res, next) => {

}

exports.updateProfile = (req, res, next) => {

}