
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validationResult = require('../utils/validation-result');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    validationResult(req);
    const params = req.body;
    bcrypt
        .hash(params.password, 12)
        .then(hashedPw => {
            params.password = hashedPw;
            const user = new User(params);
            return user.save();
        })
        .then(user => {
            res.status(201).json({ message: 'User created!', user });
        })
        .catch(err => {
            if (!err.statusCode) {
            err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
  validationResult(req);
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  let token;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
        }
        token = jwt.sign(
        {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
        );
        loadedUser.tokens.push({token});
        return loadedUser.save();
    })
    .then(user => {
      res.status(200).json({ token, user });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.logout = (req, res, next) => {
  User.findOne({_id: req.userId})
    .then(user => {
      user.tokens.forEach((t, index, tokens) => {
        if (t.token === req.token){
          tokens.splice(index, 1);
        }
      })
      return user.save();
    })
    .then(user => {
      res.status(200).json({message: 'Logout from application', user});
    })
}