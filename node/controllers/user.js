const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.list = (req, res, next) => {
  User.find()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({error}));
};

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                login: req.body.login,
                password: hash,
                isAdmin: false
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        user: {id: user._id, isAdmin: user.isAdmin},
                        token: jwt.sign(
                            {userId: user._id},
                            'S3CR3TK3Y',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
exports.find = (req, res, next) => {
    let id = req.params.id;
    User.findOne({_id: id})
        .then(user => {
            res.status(200).json({
                user: user
            })
        })
        .catch(error => {
            res.status((500).json({error}))
        })
};