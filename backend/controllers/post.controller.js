//================================================================================
//  Post controller
//================================================================================

//------------------------------------
//  Post creating function
//------------------------------------
exports.createPost = (req, res, next) => {
  res.status(201).json({ message: 'Post created!' });
};

//------------------------------------
//  Post liking function
//------------------------------------
exports.likePost = (req, res, next) => {
  res.status(200).json({ message: 'Post liked!' });
};

//------------------------------------
//  Post editing function
//------------------------------------
exports.editPost = (req, res, next) => {
  res.status(200).json({ message: 'Post edited!' });
};

//------------------------------------
//  Post deleting function
//------------------------------------
exports.deletePost = (req, res, next) => {
  res.status(200).json({ message: 'Post deleted!' });
};

//------------------------------------
//  Function to get all posts
//------------------------------------
exports.getAllPosts = (req, res, next) => {
  res.status(200).json(posts);
}

/*
Still to be done:
- createComment
- editComment
- deleteComment
*/