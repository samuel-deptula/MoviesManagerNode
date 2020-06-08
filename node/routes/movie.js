const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const movieCtrl = require('../controllers/movie');

console.log("route");
router.post('/movie/initialize', movieCtrl.initializeMovie);
router.post('/movie/fav', auth, movieCtrl.switchFav);
router.get('/movie/fav/list/:id', auth, movieCtrl.listFav);

module.exports = router;