//================================================================================
//  Post routes
//================================================================================

// Required modules
const express = require('express');
const postCtrl = require('../controllers/post.controller');
const authMddlw = require('../middleware/authorization');
const multer = require('../middleware/multer-config');

// Post router
const router = express.Router();

router.get('/', authMddlw.authorizeRequest, postCtrl.getAllPosts);
router.post('/', authMddlw.authorizeRequest, multer, postCtrl.createPost);
router.put('/:postId', authMddlw.authorizeRequest, multer, postCtrl.editPost);
router.put('/:postId/like', authMddlw.authorizeRequest, postCtrl.likePost);
router.delete('/:postId', authMddlw.authorizeRequest, postCtrl.deletePost);

router.put('/:postId/comments', authMddlw.authorizeRequest, postCtrl.createComment);
router.put('/:postId/comments/:commentId', authMddlw.authorizeRequest, postCtrl.editComment);
router.put('/:postId/comments/:commentId/delete', authMddlw.authorizeRequest, postCtrl.deleteComment);

// Exporting the post router
module.exports = router;