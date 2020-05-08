const multer = require('multer');
const os = require('os');

exports.fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'src/images');
	},
	filename: (req, file, cb) => {
        if (os.platform() === 'win32'){
            cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname); // Windows
        } else {
            cb(null, new Date().toISOString() + '-' + file.originalname); // Mac
        }
	}
});

exports.fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
};
