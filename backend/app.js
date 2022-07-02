//================================================================================
//  Express Application
//================================================================================

// Required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Configuring Dotenv
dotenv.config();

// Connecting the application to the database using mongoose
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connection to MongoDB was successful!'))
  .catch(() => console.log('Connection to MongoDB has failed!'));

// Declaring the Express Application
const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Temporary middleware
app.use((req, res) => {
  res.json({ message: 'Server response!' });
});

// Exporting the application
module.exports = app;