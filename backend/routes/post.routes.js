//================================================================================
//  Post routes
//================================================================================

// Required modules
const express = require('express');

const postCtrl = require('../controllers/post.controller');
const multer = require('../middleware/multer-config');

// Post router
const router = express.Router();

router.post('/', multer, postCtrl.createPost);
router.post('/:postId/like', postCtrl.likePost);
router.put('/:postId', multer,  postCtrl.editPost);
router.delete('/:postId', postCtrl.deletePost);
router.get('/', postCtrl.getAllPosts);

router.post('/:postId/comments', postCtrl.createComment);
router.put('/:postId/comments/:commentId', postCtrl.editComment);
router.delete('/:postId/comments/:commentId', postCtrl.deleteComment);

// Exporting the post router
module.exports = router;