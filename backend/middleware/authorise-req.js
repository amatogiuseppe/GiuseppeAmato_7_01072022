//================================================================================
//  Authorization middleware: to authorize each request
//================================================================================

// Required modules
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Configuring Dotenv
dotenv.config();

//------------------------------------
//  Authentication configuration
//------------------------------------
module.exports = (req, res, next) => {
  try {
    // decoding the token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    const userId = decodedToken.userId;
    // An object containing the user ID is added to the request
    req.auth = { userId };
    // token checking
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid User ID!';
    } else {
      next();
    }
  } catch {
    res.status(401).json({ message: 'Request not allowed!' });
  }
};