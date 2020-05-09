const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
    User
        .find()
        .then(users => {
            console.log(users);
            
            if (!users || users.length === 0){
                const error = new Error('No user found');
                error.statusCode = 401;
                throw error;
            }
            res.status(200).json({message: 'Users fetched with success!', users});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                }
                next(err);
        });
}

exports.getCurrentUser = (req, res, next) => {
    User.findOne({_id: req.userId})
        .then(user => {
            if (!user){
                const error = new Error('User not found');
                error.statusCode = 401;
                throw error;
            }
            res.status(200).json({ message: 'Current fetched user', user })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                }
                next(err);
        });
}

exports.getUserProfiles = (req, res, next) => {
    User.findOne({_id: req.userId})
        .then(user => {
            if (!user){
                const error = new Error('User not found');
                error.statusCode = 401;
                throw error;
            }
            return user.populate('profiles').execPopulate();
        })
        .then(user => {
            res.status(200).json({ message: 'User profiles', profiles: user.profiles })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                }
                next(err);
        });
}

exports.deleteUser = (req, res, next) => {
    User.findOne({_id: req.params.userId})
        .then(user => {
            return user.remove();
        })
        .then(result => {
            res.status(200).json({ message: 'User deleted!' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                }
                next(err);
        });
}