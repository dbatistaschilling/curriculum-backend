const jwt = require('jsonwebtoken');
const Token = require('../models/token')

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		const error = new Error('No authentication sent by the client.');
		error.statusCode = 401;
		throw error;
	}
	const token = authHeader.split(' ')[1];	
	let decodedToken;
	Token.findOne({ token })
		.then(t => {			
			if (!t){
				const error = new Error('Not authenticated.');
				error.statusCode = 401;
				throw error;
			}
			try {
				decodedToken = jwt.verify(t.token, process.env.JWT_SECRET_KEY);
			} catch (err) {
				if (err.message === 'jwt expired'){
					t.remove();
				}
				err.statusCode = 500;
				throw err;
			}
			req.userId = decodedToken.userId;
			req.token = t.token;
			next();
		})
		.catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                }
                next(err);
		});
};