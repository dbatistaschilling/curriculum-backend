// Core imports
const path = require('path');
// Package imports
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
require('./db/mongoose')
const bodyParser = require('body-parser');

const multer = require('multer');
// Middlewares imports
const cors = require('./middlewares/cors');
const errors = require('./middlewares/errors');
const {fileStorage, fileFilter, sharpMethod} = require('./middlewares/images');
// Routes imports
const profile = require('./routes/profile');
const auth = require('./routes/auth');
const user = require('./routes/user');
const category = require('./routes/category');
const knowledge = require('./routes/knowledge');
const clientEmail = require('./routes/mail');

const app = express();

// Parsers
app.use(bodyParser.json()); // application/json

// Middlewares Usage
app.use(cors); // Permition among systems
app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('image'), sharpMethod);
app.use('/src/images', express.static(path.join(__dirname, 'src', 'images')));

// Routes end points
app.use(auth);
app.use(user);
app.use(profile);
app.use(category);
app.use(knowledge);
app.use(clientEmail);

app.use(helmet());
app.use(compression());

app.use(errors); // Error handler

module.exports = app;