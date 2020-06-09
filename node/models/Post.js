const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author_id: { type: String, required: true },
    author_email: { type: String, required: true },
    date: { type: String, required: true },
});

postSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', postSchema);