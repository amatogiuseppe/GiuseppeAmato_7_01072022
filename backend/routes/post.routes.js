//================================================================================
//  Post routes
//================================================================================

// Required modules
const express = require('express');
const postCtrl = require('../controllers/post.controller');
const multer = require('../middleware/multer-config');
const authoriseReq = require('../middleware/authorise-req');


// Post router
const router = express.Router();

router.get('/', authoriseReq, postCtrl.getAllPosts);
router.post('/', authoriseReq, multer, postCtrl.createPost);
router.put('/:postId', authoriseReq, multer, postCtrl.editPost);
router.put('/:postId/like', authoriseReq, postCtrl.likePost);
router.delete('/:postId', authoriseReq, postCtrl.deletePost);

router.put('/:postId/comments', authoriseReq, postCtrl.createComment);
router.put('/:postId/comments/:commentId', authoriseReq, postCtrl.editComment);
router.put('/:postId/comments/:commentId/delete', authoriseReq, postCtrl.deleteComment);

// Exporting the post router
module.exports = router;