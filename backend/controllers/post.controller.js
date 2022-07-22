//================================================================================
//  Post controller
//================================================================================

// Required modules
const fs = require('fs');
const PostModel = require('../models/post.model');

//------------------------------------
//  Function to get all posts
//------------------------------------
exports.getAllPosts = (req, res, next) => {
  PostModel.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

//------------------------------------
//  Post creating function
//------------------------------------
exports.createPost = (req, res, next) => {
  // The userId specified does not match the userId of the person who wants to send the post
  if ( req.body.postUserId && req.auth.userId !== req.body.postUserId ) {
    return res.status(401).json({ error: 'Request not allowed!' });
  }
  let postObject = {
    postUserId: req.auth.userId,
    postContent: req.body.postContent
  };
  if (req.file) {
    // Case 1: If the user enters a file with an invalid format
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    ) {
      postObject = {
        postUserId: req.auth.userId,
        postContent: req.body.postContent,
        imageUrl: "../images/"
      }
      fs.unlink(`images/${req.file.filename}`, () => { postObject });
    }
    // Case 2: If the user enters a file with an valid format
    else {
      postObject = {
        postUserId: req.auth.userId,
        postContent: req.body.postContent,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    }
  }
  // creating the new post
  const post = new PostModel({ ...postObject });
  // saving the new post in the database
  post.save()
    .then(() => res.status(201).json({ message: 'The post was successfully created!'}))
    .catch(error => res.status(400).json({ error }));
};

//------------------------------------
//  Post editing function
//------------------------------------
exports.editPost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.postId })
    .then(post => {
      // Case 1 - The specified post is not in the database
      if (!post) {
        return res.status(404).json({ error: 'No post found!' });
      }
      // Case 2 - The specified post does not belong to the person requesting its modification
      if ((post.postUserId !== req.auth.userId) && !req.auth.isAdmin) {
        return res.status(401).json({ error: 'Request not allowed!' });
      }
      // Case 3.1 - Editing the post: The user only wants to edit the post message, not add images
        // Case 3.1.1: The user only wants to edit the message of the post
        let postObject = { postContent: req.body.postContent }
        // Case 3.1.2: The user wants to edit the post message and/or remove the attached image
        if (req.body.imageUrl && req.body.imageUrl == "../images/") {
          const filename = post.imageUrl.split('/images/')[1];
          postObject = {
            postContent: req.body.postContent,
            imageUrl: req.body.imageUrl
          }
          fs.unlink(`images/${filename}`, () => { postObject });
        }
      // Case 3.2 - Editing the post: the user may upload a new image along with the post message
      if (req.file) {
        // Case 3.2.1: If the user enters a file with an invalid format
        if (
          req.file.mimetype != "image/jpg" &&
          req.file.mimetype != "image/png" &&
          req.file.mimetype != "image/jpeg"
        ) {
          postObject = {
            postContent: req.body.postContent,
            imageUrl: "../images/"
          }
          fs.unlink(`images/${req.file.filename}`, () => { postObject });
        }
        // Case 3.2.2: If the user enters a file with an valid format
        else {
          const filename = post.imageUrl.split('/images/')[1];
          postObject = {
            postContent: req.body.postContent,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }
          fs.unlink(`images/${filename}`, () => { postObject })
        }
      }
      // Updating the post
      PostModel.updateOne({ _id: req.params.postId }, { ...postObject, _id: req.params.postId })
        .then(() => res.status(200).json({ message: 'The post has been successfully edited!'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//------------------------------------
//  Post deleting function
//------------------------------------
exports.deletePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.postId })
    .then(post => {
      // Case 1 - The specified post is not in the database
      if (!post) {
        return res.status(404).json({ error: 'No post found!' });
      }
      // Case 2 - The specified post does not belong to the person requesting its removal
      if ((post.postUserId !== req.auth.userId) && !req.auth.isAdmin) {
        return res.status(401).json({ error: 'Request not allowed!' });
      }
      // Case 3 - The specified post exists and belongs to the person requesting its removal
      const filename = post.imageUrl.split('/images/')[1];
      // Case 3.1 - Removing the post: no image is attached to the post
      if (filename == "") {
        PostModel.deleteOne({ _id: req.params.postId })
          .then(() => res.status(200).json({ message: 'The post was successfully deleted!'}))
          .catch(error => res.status(400).json({ error }));
      }
      // Case 3.2 - Removing the post: an image is attached to the post and also needs to be deleted
      else {
        fs.unlink(`images/${filename}`, () => {
          PostModel.deleteOne({ _id: req.params.postId })
            .then(() => res.status(200).json({ message: 'The post was successfully deleted!'}))
            .catch(error => res.status(400).json({ error }));
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

//------------------------------------
//  Post liking function
//------------------------------------
exports.likePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.postId })
    .then( post => {
      // Case 1 - The specified post is not in the database
      if (!post) {
        return res.status(404).json({ error: 'No post found!' });
      }
      // Case 2 - The specified post is in the database
      switch (req.body.like) {
        // Case 2.1 - The user wants to put a like
        case 1:
          // Case 2.1.1 - The user has not yet placed a like and can proceed in doing so
          if (!post.likers.includes(req.auth.userId)) {
            PostModel.updateOne({ _id: req.params.postId }, { $inc: { likes: +1 }, $push: { likers: req.auth.userId } })
              .then(() => res.status(200).json({ message: "Your like has been added!" }))
              .catch((error) => res.status(400).json({ error }));
          }
          // Case 2.1.2 - The user had already put a like and therefore cannot put another one
          else {
            return res.status(403).json({ error: "You've already liked this post!" });
          }
        break;
        // Case 2.2 - The user wants to remove his like
        case 0:
          // Case 2.2.1 - The user has previously placed a like and can proceed to remove it
          if (post.likers.includes(req.auth.userId)) {
            PostModel.updateOne({ _id: req.params.postId }, { $inc: { likes: -1 }, $pull: { likers: req.auth.userId } })
              .then(() => res.status(200).json({ message: "Your like has been removed!" }))
              .catch((error) => res.status(400).json({ error }));
          }
          // Case 2.2.2 - The user did not put any likes on post, so no likes to remove
          else {
            return res.status(403).json({ error: 'You have not yet put a like on this post so no likes to remove!' });
          }
        break;
        default:
          return res.status(403).json({ error: 'There is an error in the request!' });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

//------------------------------------
//  Comment creating function
//------------------------------------
exports.createComment = (req, res, next) => {
  PostModel.findOne({ _id: req.params.postId })
    .then(post => {
      // Case 1 - The specified post is not in the database
      if (!post) {
        return res.status(404).json({ error: 'No post found!' });
      }
      // Case 2 - The specified comment does not belong to the person requesting its creation
      if (req.body.commentUserId && req.body.commentUserId !== req.auth.userId) {
        return res.status(401).json({ error: 'Request not allowed!' });
      }
      // Case 3 - Comment creation
      const commentObject = {
        commentUserId: req.auth.userId,
        commentContent: req.body.commentContent,
        timestamp: new Date().getTime()
      };
      // Attaching the comment to the post and saving it to the database
      PostModel.updateOne({ _id: req.params.postId }, { $push: { comments: { ...commentObject } } })
        .then(() => res.status(200).json({ message: 'The comment was created and was successfully attached to the post!'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//------------------------------------
//  Comment editing function
//------------------------------------
exports.editComment = (req, res, next) => {
  PostModel.findOne({ _id: req.params.postId })
    .then(post => {
      // Case 1 - The specified post is not in the database
      if (!post) {
        return res.status(404).json({ error: 'No post found!' });
      }
      // Case 2 - The specified comment is not in the database
      const searchCommentIndex = post.comments.findIndex( (comment) => comment._id == req.params.commentId );
      if (searchCommentIndex == -1) {
        return res.status(404).json({ error: 'No comment found!' });
      }
      // Case 3 - The specified comment does not belong to the person requesting its modification
      const commentFound = post.comments[searchCommentIndex];
      if (commentFound.commentUserId !== req.auth.userId) {
        return res.status(401).json({ error: 'Request not allowed!' });
      }
      if (req.body.commentUserId && req.body.commentUserId !== req.auth.userId) {
        return res.status(401).json({ error: 'Request not allowed!' });
      }
      // Case 4 - Editing the comment
      PostModel.updateOne({ _id: req.params.postId, "comments._id": req.params.commentId }, { $set: { "comments.$.commentContent" : req.body.commentContent } })
        .then(() => res.status(200).json({ message: 'The comment has been successfully edited!'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//------------------------------------
//  Comment deleting function
//------------------------------------
exports.deleteComment = (req, res, next) => {
  PostModel.findOne({ _id: req.params.postId })
    .then(post => {
      // Case 1 - The specified post is not in the database
      if (!post) {
        return res.status(404).json({ error: 'No post found!' });
      }
      // Case 2 - The specified comment is not in the database
      const searchCommentIndex = post.comments.findIndex( (comment) => comment._id == req.params.commentId );
      if (searchCommentIndex == -1) {
        return res.status(404).json({ error: 'No comment found!' });
      }
      // Case 3 - The specified comment does not belong to the person requesting its removal
      const commentFound = post.comments[searchCommentIndex];
      if (commentFound.commentUserId !== req.auth.userId) {
        return res.status(401).json({ error: 'Request not allowed!' });
      }
      // Case 4 - Removing the comment
      PostModel.updateOne({ _id: req.params.postId }, { $pull: { comments: commentFound } })
        .then(() => res.status(200).json({ message: 'The comment was successfully deleted!'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};