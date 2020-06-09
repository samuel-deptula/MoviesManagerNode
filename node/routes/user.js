const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', auth, userCtrl.list);
router.get('/user/:id', auth, userCtrl.find);
router.post('/user/ban', auth, userCtrl.ban);

module.exports = router;