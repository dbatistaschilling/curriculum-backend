module.exports = (error, req, res, next) => {	
	const status = error.statusCode || 500;
	const message = error.message;
	const param = error.param;		
	res.status(status).json({ status, param, message });
}