const fs = require('fs');
const path = require('path');

// REST API
const deleteFile = (filePath) => {
	fs.unlink(filePath, (err) => {
		if (err) {
			throw err;
		}
	});
}

module.exports = deleteFile;