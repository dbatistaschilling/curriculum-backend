// Package imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Middlewares imports
const cors = require('./middlewares/cors');
const errors = require('./middlewares/errors');
// Routes imports
const profile = require('./routes/profile');

const app = express();
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-kxzpv.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`

// Parsers
app.use(bodyParser.json()); // application/json

// Middlewares Usage
app.use(cors); // Permition among systems

// Routes end points
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