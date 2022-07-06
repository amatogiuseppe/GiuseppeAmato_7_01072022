//================================================================================
//  User controller
//================================================================================

// Required modules
const fs = require('fs');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

//------------------------------------
//  Function to get one user
//------------------------------------
exports.getOneUser = (req, res, next) => {
  UserModel.findOne({ _id: req.params.userId }).select('-password')
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};

//------------------------------------
//  Function to get all users
//------------------------------------
exports.getAllUsers = (req, res, next) => {
  UserModel.find().select('-password')
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};

//------------------------------------
//  Function to edit the user
//------------------------------------
exports.editUserInfo = (req, res, next) => {
  UserModel.findOne({ _id: req.params.userId })
    .then(user => {
      // Case 1 - The specified user is not in the database
      if (!user) {
        return res.status(404).json({ error: 'No user found!' });
      }
      // Case 2 - The specified user is not the same person who requested the modification
      if ( req.auth.userId !== req.params.userId ) {
        return res.status(401).json({ error: 'Request not allowed!' });
      }
      // Case 3 - If the user tries to change the password here he is blocked
      if (req.body.password) {
        return res.status(401).json({ error: 'It is not allowed to change the password here!' });
      }
      // Case 4.1: Editing the user: the user wants to change only the user information, but not the image
      let userObject = { ...req.body };
      // Case 4.2: Editing the user: the user may upload a new image along with the user information
      if (req.file) {
        const filename = user.imageUrl.split('/images/')[1];
        userObject = {
          ...req.body,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        fs.unlink(`images/${filename}`, () => { userObject })
      }
      // Updating the user
      UserModel.updateOne({ _id: req.params.userId }, { ...userObject, _id: req.params.userId })
        .then(() => res.status(200).json({ message: 'User edited!'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//------------------------------------
//  Function to edit the password
//------------------------------------
exports.editUserPassword = (req, res, next) => {
  UserModel.findOne({ _id: req.params.userId })
    .then(user => {
      // Case 1 - The specified user is not in the database
      if (!user) {
        return res.status(404).json({ error: 'No user found!' });
      }
      // Case 2 - The specified user is not the same person who requested the password change
      if ( req.auth.userId !== req.params.userId ) {
        return res.status(401).json({ error: 'Request not allowed!' });
      }
      // Case 3 - The specified user is the same person who requested the password change:
      // To change the password you have to enter the old one first and then the new one
      if (!req.body.oldPassword) {
        return res.status(401).json({ error: 'You must first enter the old password!' });
      }
      if (!req.body.newPassword) {
        return res.status(401).json({ error: 'You must enter the new password!' });
      }
      // Checking the old password
      bcrypt.compare(req.body.oldPassword, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Invalid password!' });
          }
          if (req.body.newPassword == req.body.oldPassword) {
            return res.status(401).json({ error: 'The new password must be different from the old one!' });
          }
          // Changing passaword
          bcrypt.hash(req.body.newPassword, 10)
            .then(hash => {
              let userObject = { password: hash };
              UserModel.updateOne({ _id: req.params.userId }, { ...userObject, _id: req.params.userId })
                .then(() => res.status(200).json({ message: 'Password edited!'}))
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
};

//------------------------------------
//  Function to delete the user
//------------------------------------
exports.deleteUser = (req, res, next) => {
  UserModel.findOne({ _id: req.params.userId })
    .then( user => {
      // Case 1 - The specified user is not in the database
      if (!user) {
        return res.status(404).json({ error: 'No user found!' });
      }
      // Case 2 - The specified user is not the same person who requested deletion of the account
      if ( req.auth.userId !== req.params.userId ) {
        return res.status(401).json({ error: 'Request not allowed!' });
      }
      // Case 3 - The specified user is the same person who requested deletion of the account:
      // Asking for the password to get confirmation to delete the account
      if (!req.body.password) {
        return res.status(401).json({ error: 'Provide the password to delete the account!' });
      }
      // Checking the password
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          // Case 1 - The user entered an invalid password
          if (!valid) {
            return res.status(401).json({ error: 'Invalid password!' });
          }
          const filename = user.imageUrl.split('/images/')[1];
          // Case 2.1 - The user does not possess any personal image
          if (filename == "") {
            UserModel.deleteOne({ _id: req.params.userId })
              .then(() => res.status(200).json({ message: 'The user was successfully deleted!'}))
              .catch(error => res.status(400).json({ error }));
          }
          // Case 2.2 - The user has a personal image that must also be deleted
          else {
            fs.unlink(`images/${filename}`, () => {
              UserModel.deleteOne({ _id: req.params.userId })
                .then(() => res.status(200).json({ message: 'The user was successfully deleted!'}))
                .catch(error => res.status(400).json({ error }));
            });
          }
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};