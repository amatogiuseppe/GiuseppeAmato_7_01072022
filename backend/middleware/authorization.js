//================================================================================
//  Authorization middleware
//================================================================================

// Required modules
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../models/user.model');

//Configuring Dotenv
dotenv.config();

//------------------------------------
//  Function to authorize each request
//------------------------------------
exports.authorizeRequest = (req, res, next) => {
  try {
    // decoding the token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    const userId = decodedToken.userId;
    // An object containing the user ID is added to the request
    req.auth = { userId };
    next();
  } catch {
    res.status(401).json({ message: 'Request not allowed!' });
  }
};

//------------------------------------
//  Function to get the user id from the token
//------------------------------------
exports.checkUser = (req, res, next) => {
  try {
    // Case where no token is present
    if (!req.body.token) {
      return res.status(200).json(false);
    }
    // decoding the token
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    const userId = decodedToken.userId;
    UserModel.findOne({ _id: userId }).select('-password')
      .then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({ error }));
  } catch {
    res.status(401).json({ message: 'Request not allowed!' });
  }
};