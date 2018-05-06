'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config()

/**
 * Constants
 */
const API_URL = '/api';

/**
 * MongoDB connection settings
 */
mongoose.connect(process.env.MONGODB_URL);

/**
 * App configuration
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
 * Routes
 */
app.use(`/client`, require('./routes/client'));
app.use(`${API_URL}/app-user`, require('./routes/app-user'));
app.use(`${API_URL}/referral`, require('./routes/referral'));
app.use(`${API_URL}/users`, require('./routes/users'));
app.use(`${API_URL}/phone-verification`, require('./routes/phone-verification'));

// catch 404
app.use((req, res) => {
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res) => {
  const status = err.status || 500;
  res.status(status).send({ status, error: 'Server error' });
});

module.exports = app;
