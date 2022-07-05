//================================================================================
//  Auth routes
//================================================================================

// Required modules
const express = require('express');
const checkInputData = require('../middleware/check-input-data');
const authCtrl = require('../controllers/auth.controller');

// User router
const router = express.Router();

// Auth routes
router.post('/signup', checkInputData, authCtrl.signup);
router.post('/login', authCtrl.login);

// Exporting the user router
module.exports = router;