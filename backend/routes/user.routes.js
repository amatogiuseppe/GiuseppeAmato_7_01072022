//================================================================================
//  User routes
//================================================================================

// Required modules
const express = require('express');
const userCtrl = require('../controllers/user.controller');
const checkInputData = require('../middleware/check-input-data');
const authoriseReq = require('../middleware/authorise-req');

// User router
const router = express.Router();

// User routes
router.get('/', authoriseReq, userCtrl.getAllUsers);
router.get("/:userId", authoriseReq, userCtrl.getOneUser);
router.put("/:userId", authoriseReq, checkInputData, userCtrl.editUserInfo);
router.put("/:userId/auth", authoriseReq, checkInputData, userCtrl.editUserPassword);
router.delete("/:userId", authoriseReq, userCtrl.deleteUser);

// Exporting the user router
module.exports = router;