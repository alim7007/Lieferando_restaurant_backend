const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };


const BlogSchema = new Schema({
    title: String,
    description: String
}, opts);



module.exports = mongoose.model('Blog', BlogSchema);