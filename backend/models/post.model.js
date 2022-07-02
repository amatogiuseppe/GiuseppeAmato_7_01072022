//================================================================================
//  Post model
//================================================================================

// Required modules
const mongoose = require('mongoose');

// Post schema
const postSchema = mongoose.Schema(
  {
    postUserId: { type: String, required: true },
    postBody: { type: String, required: true, maxLength: 500, trim: true },
    imageUrl: { type: String, required: false },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0 },
    usersLiked: { type: [String], required: false, default: [] },
    usersDisliked: { type: [String], required: false, default: [] },
    comments: {
      type:
        [{
          commentUserId: { type: String },
          commentBody: { type: String },
          timestamp: { type: Number }
        }],
      required: false,
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Exporting the post's schema
module.exports = mongoose.model('Post', postSchema);