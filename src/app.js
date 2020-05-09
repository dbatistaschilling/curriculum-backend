// Core imports
const path = require('path');
// Package imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
// Middlewares imports
const cors = require('./middlewares/cors');
const errors = require('./middlewares/errors');
const {fileStorage, fileFilter} = require('./middlewares/images');
// Routes imports
const profile = require('./routes/profile');
const auth = require('./routes/auth');
const user = require('./routes/user');

const app = express();
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-kxzpv.mongodb.net/${process.env.MONGO_DEV_DATABASE}?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`

// Parsers
app.use(bodyParser.json()); // application/json

// Middlewares Usage
app.use(cors); // Permition among systems
app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/src/images', express.static(path.join(__dirname, 'src', 'images')));

// Routes end points
app.use(auth);
app.use(user);
app.use(profile);



app.use(errors); // Error handler

mongoose
	.connect(
		MONGODB_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	.then(result => {
		app.listen(process.env.PORT || 3000);
	})
	.catch(err => {
		console.log(err);
	});