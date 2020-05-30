const User = require('../models/user');
const clientQueries = require('../utils/client-queries');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.getAllUsers = (req, res, next) => {
    User
        .find()
        .then(users => {
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
            res.status(200).json({ message: 'Current fetched user', user, token: req.token })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                }
                next(err);
        });
}

exports.getUserProfiles = (req, res, next) => {  
    const [match, page, perPage, sortby] = clientQueries(req);
    User.findOne({_id: req.userId})
        .then(user => {
            if (!user){
                const error = new Error('User not found');
                error.statusCode = 401;
                throw error;
            }
            return user.populate({
                path: 'profiles',
                match,
                options: {
                    limit: +perPage,
                    skip: (+page * +perPage) - +perPage,
                    sort: {
                        [sortby[0]]: sortby[1] 
                    }
                }
            }).execPopulate();
        })
        .then(user => {
            if (user.profiles.length === 0){
                const error = new Error('No profiles found');
                error.statusCode = 401;
                throw error;
            }
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
        .then(user => {
            res.status(200).json({ message: 'User deleted!', user });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                }
                next(err);
        });
}