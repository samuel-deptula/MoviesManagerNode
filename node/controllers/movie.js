const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.initializeMovie = (req, res, next) => {
    let userId = req.body.userId;
    let movieId = req.body.movieId;
    let count = 0;
    User.findOne({_id: userId})
        .then(user => {
            if (user.movies.length > 0) {
                    user.movies.forEach(movie => {
                        if(movie.id == movieId) {
                            count ++;
                        }
                });
                    console.log(count);
                if (count == 0) {
                    user.movies.push({
                        id: movieId,
                        watched: false,
                        fav: false,
                        rate: 0
                    });
                }
            } else {
                user.movies.push({
                    id: movieId,
                    watched: false,
                    fav: false,
                    rate: 0
                });
            }
            user.save();
            let movie = user.movies.find(movie => movie.id == movieId);
            res.status(200).json({
                movie: movie
            })
        })
        .catch(error => res.status(400).json({error}));
};

exports.switchFav = (req, res, next) => {
    User.update(
        { "_id" : req.body.userId, "movies.id": req.body.movieId },
    { "$set": { "movies.$.fav": req.body.fav }},
    function(err, user) {
    });
      User.findOne({ _id: req.body.userId })
          .then(user => {
             let movie = user.movies.find(movie => movie.id == req.body.movieId);
             console.log(movie);
              res.status(200).json({
                  movie: movie
              })
          .catch(error => res.status(500).json({ error }));
          })
};
exports.listFav = (req, res, next) => {
    let id = req.params.id;
    User.findOne({_id: id})
        .then(user => {
            res.status(200).json({
                favs: user.movies.filter(movie => movie.fav == true)
            })
        })
        .catch(error => res.status(400).json({error}));
};

