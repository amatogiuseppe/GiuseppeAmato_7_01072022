//================================================================================
//  Post routes
//================================================================================

// Required modules
const express = require('express');
const postCtrl = require('../controllers/post.controller');

// Post router
const router = express.Router();

router.post('/', postCtrl.createPost);
router.post('/:postId/like', postCtrl.likePost);
router.put('/:postId', postCtrl.editPost);
router.delete('/:postId', postCtrl.deletePost);
router.get('/', postCtrl.getAllPosts);

router.post('/:postId/comments', postCtrl.createComment);
router.put('/:postId/comments/:commentId', postCtrl.editComment);
router.delete('/:postId/comments/:commentId', postCtrl.deleteComment);

// Exporting the post router
module.exports = router;