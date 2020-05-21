const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const validationResult = require('../utils/validation-result');

const Token = require('../models/token');
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
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
          const error = new Error('A user with this email could not be found.');
          error.statusCode = 401;
          error.param = 'email';
          throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            error.param = 'password';
            throw error;
        }
        const token = jwt.sign(
        {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
        );
        const newToken = new Token({token, owner: loadedUser._id});
        return newToken.save();
    })
    .then(token => {
      res.status(200).json({ token, userId: token.owner });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.logout = (req, res, next) => {
  Token.findOne({ token: req.token })
    .then(token => {
      return token.remove();
    })
    .then(token => {
      res.status(200).json({message: 'Logout from application', token});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

exports.forgotPassword = (req, res, next) => {
  const params = Object.keys(req.body);
  let error;
  if (!params.includes('email')){
      error = new Error('No email sent by the client');
  } else if (!req.body.email){
      error = new Error('Email input is empty');
  } else if (!params.includes('url')){
      error = new Error('Application URL not sent by the client');
  } else if (!req.body.url){
      error = new Error('URL of the application not set by the client');
  } else if (!params.includes('recoverPath')){
      error = new Error('Recover email path not sent by the client');
  } else if (!req.body.recoverPath){
      error = new Error('Recover path not set by the client');
  }
  if (error){
    error.statusCode = 401;
    throw error;
  }

  let userObj;
  User.findOne({ email: req.body.email })
    .then(user => {
        if (!user){
          const error = new Error('No user with this email found');
          error.statusCode = 401;
          throw error;
        }
        userObj = user;
        return crypto.randomBytes(32, (err, buffer) => {
          if (err) {
            err.statusCode = 500;
            next(err);
          }
          const token = buffer.toString('hex');
          userObj.resetToken = token;
          userObj.resetTokenExpiration = Date.now() + 3600000; // Miliseconds for 1h
          userObj.save();
          return token;
        });
    })
    .then(token => {
        return sgMail.send({
          to: req.body.email,
          from: 'dbatistaschilling@gmail.com',
          subject: 'Recover password',
          text: 'You requested a password reset',
          html: `<p><strong>Click this </strong> <a href="http://${req.body.url}/${req.body.recoverPath}/${token}">link</a> to set a new password.</p>`,
        });
    })
    .then(result  => {       
      res.status(200).json({ message: 'Email sent to the user', user: userObj });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

exports.changePassword = (req, res, next) => {
  const params = Object.keys(req.body);
  let error;
  if (!params.includes('passwordToken')){
      error = new Error('passwordToken not sent by the client');
  } else if (!req.body.passwordToken){
      error = new Error('passwordToken is empty');
  } else if (!params.includes('userId')){
      error = new Error('userId id not set by the client');
  } else if (!req.body.userId){  
      error = new Error('userId is empty');
  }
  if (error){
    error.statusCode = 401;
    throw error;
  }
  validation(req);

	const newPassword = req.body.password;
	const token = req.body.passwordToken;
	const userId = req.body.userId;

	let resetUser;
	User.findOne({_id: userId, resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
		.then(user => {			
			if (!user) {
        const error = new Error('No user with this email found');
        error.statusCode = 401;
        throw error;
			}
			resetUser = user;
			return bcrypt.hash(newPassword, 12);
		})
		.then(hashedPassword => {
			resetUser.password = hashedPassword;
			resetUser.resetToken = null;
			resetUser.resetTokenExpiration = null;
			return resetUser.save();
		})
		.then(result => {
      res.status(200).json({ message: 'Password updated with success!', user: resetUser });
		})
		.catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}