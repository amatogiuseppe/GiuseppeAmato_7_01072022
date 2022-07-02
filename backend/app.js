//================================================================================
//  Express Application
//================================================================================

// Required modules
const express = require('express');

// Declaring the Express Application
const app = express();

// Temporary middleware
app.use((req, res) => {
  res.json({ message: 'Server response!' });
});

// Exporting the application
module.exports = app;