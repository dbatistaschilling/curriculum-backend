const fs = require('fs');
const path = require('path');

// REST API
const deleteFile = (filePath, next) => {
	fs.unlink(filePath, (err) => {
		if (err) {
			err.param = 'image';
			err.statusCode = 500;
			next(err);
		}
	});
}

module.exports = deleteFile;