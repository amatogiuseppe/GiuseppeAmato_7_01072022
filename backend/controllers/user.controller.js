//================================================================================
//  User controller
//================================================================================

//------------------------------------
//  User sign-up
//------------------------------------
exports.signup = (req, res, next) => {
  res.status(201).json({ message: 'User successfully created!' });
};

//------------------------------------
//  User login
//------------------------------------
exports.login = (req, res, next) => {
  res.status(200).json({ message: 'User successfully logged in!' });
};

/*
Still to be done:
- getAllUsers
- getOneUser
- editUser
- deleteUser
*/