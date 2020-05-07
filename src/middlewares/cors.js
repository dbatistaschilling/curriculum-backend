exports.default = (req, res, next) => {
	// res.setHeader('Access-Control-Allow-Origin', 'origin_domain'); // Choose client
	res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all clients
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    /* This line authorizes the client site to also set headers when sending a request */
	next();
}