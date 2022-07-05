//================================================================================
//  Express Application
//================================================================================

// Required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

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

// Middleware to handle the POST request and extract the JSON body
app.use(express.json());

// Configuration to handle image files statically whenever there is a request to the /images route
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Exporting the application
module.exports = app;