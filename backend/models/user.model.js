//================================================================================
//  User model
//================================================================================

// Required modules
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 30, trim: true },
    surname: { type: String, required: true, minLength: 3, maxLength: 30, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    imageUrl: { type: String, required: false, default: "../images/" },
    isAdmin: { type: Boolean, required: false, default: false },
    biography : { type: String, required: false, maxLength: 800, trim: true }
  },
  {
    timestamps: true
  }
);

// Implementing uniqueValidator to pre-validate information before saving it
userSchema.plugin(uniqueValidator);

// Exporting the user's schema
module.exports = mongoose.model('User', userSchema);