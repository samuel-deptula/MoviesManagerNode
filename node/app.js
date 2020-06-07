const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movies_manager')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(cors());
app.use(bodyParser.json());

console.log("app.js");
app.use('/api', userRoutes, movieRoutes);



module.exports = app;