const multer = require('multer');
const os = require('os');
const sharp = require('sharp');
const deleteFile = require('../utils/delete-file');

exports.fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'src/images');
	},
	limits: {
		fileSize: 1000000
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

exports.sharpMethod = (req, res, next) => {
	if (req.file){
		const format = req.file.path.split('.');
		const path = req.file.path.replace(`.${format[format.length -1]}`, '.png');		
		sharp(req.file.path)
			.resize({ width: 250 })
			.png()
			.toFile(path)
			.then(result => {
				deleteFile(req.file.path);
				req.file.path = path;
				return;
			})
			.catch(err => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			})
	}
	next();
}