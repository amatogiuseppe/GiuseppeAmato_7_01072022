//================================================================================
//  User routes
//================================================================================

// Required modules
const express = require('express');
const userCtrl = require('../controllers/user.controller');
const authMddlw = require('../middleware/authorization');
const multer = require('../middleware/multer-config');
const checkInputData = require('../middleware/check-input-data');

// User router
const router = express.Router();

// User routes
router.get('/', authMddlw.authorizeRequest, userCtrl.getAllUsers);
router.get("/:userId", authMddlw.authorizeRequest, userCtrl.getOneUser);
router.put("/:userId", authMddlw.authorizeRequest, multer, checkInputData, userCtrl.editUserInfo);
router.put("/:userId/auth", authMddlw.authorizeRequest, checkInputData, userCtrl.editUserPassword);

// Exporting the user router
module.exports = router;