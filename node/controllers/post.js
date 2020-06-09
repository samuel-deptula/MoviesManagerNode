const bcrypt = require('bcrypt');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

exports.list = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error}));
};
exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }, function(err, post){
        if (err){
            res.send(err);
        }
        res.json({message:"Bravo, post supprimée"});
    });
};
exports.createPost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        author_id: req.body.author_id,
        author_email: req.body.author_email,
        date: req.body.date
    });
    post.save()
        .then(() => res.status(201).json({message: 'Message envoyé'}))
        .catch(error => res.status(400).json({error}));
};
exports.find = (req, res, next) => {
    let id = req.params.id;
    Post.findOne({_id: id})
        .then(post => {
            res.status(200).json({
                post: post
            })
        })
        .catch(error => {
            res.status(500).json({error})
        })
};