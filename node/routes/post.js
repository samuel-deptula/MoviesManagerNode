const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/post');

router.post('/post', postCtrl.createPost);
router.get('/post', postCtrl.list);
router.delete('/post/:id', postCtrl.deletePost);
router.get('/post/:id', postCtrl.find);

module.exports = router;