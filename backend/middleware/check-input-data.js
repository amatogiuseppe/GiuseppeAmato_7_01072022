//================================================================================
//  Checking first name, surname, email and password
//================================================================================

//------------------------------------
//  Patterns
//------------------------------------
const namesPattern = /^[A-Z][A-Za-z\é\è\ê\'\-]+$/;
const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

//------------------------------------
//  Check function
//------------------------------------
module.exports = (req, res, next) => {
  // Checking name
  if (req.body.name && !namesPattern.test(req.body.name)) {
    return res.status(400).json({ error: "Invalid name. Please respect this format: Jon"});
  }
  // Checking surame
  if (req.body.surname && !namesPattern.test(req.body.surname)) {
    return res.status(400).json({ error: "Invalid surname. Please respect this format: Snow"});
  }
  // Checking email
  if (req.body.email && !emailPattern.test(req.body.email)) {
    return res.status(400).json({ error: "Invalid email. Please respect this format: abc@def.gh"});
  }
  // Checking password
  if (req.body.password && !passwordPattern.test(req.body.password)) {
    return res.status(400).json({ error: 'The password must be between 8 and 20 characters long, with at least one uppercase letter, one lowercase letter, one digit, and no spaces or special characters' });
  }
  next();
};