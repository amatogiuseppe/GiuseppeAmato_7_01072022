//================================================================================
//  Post model
//================================================================================

// Required modules
const mongoose = require('mongoose');

// Post schema
const postSchema = mongoose.Schema(
  {
    postUserId: { type: String, required: true },
    postContent: { type: String, required: true, maxLength: 800, trim: true },
    imageUrl: { type: String, required: false, default: "../images/" },
    likes: { type: Number, required: false, default: 0 },
    likers: { type: [String], required: false, default: [] }
  },
  {
    timestamps: true
  }
);

// Exporting the post's schema
module.exports = mongoose.model('Post', postSchema);