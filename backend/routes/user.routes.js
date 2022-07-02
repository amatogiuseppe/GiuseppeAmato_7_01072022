//================================================================================
//  User routes
//================================================================================

// Required modules
const express = require('express');
const userCtrl = require('../controllers/user.controller');

// User router
const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/', userCtrl.getAllUsers);
router.get("/:userId", userCtrl.getOneUser);
router.put("/:userId", userCtrl.editUser);
router.delete("/:userId", userCtrl.deleteUser)

// Exporting the user router
module.exports = router;