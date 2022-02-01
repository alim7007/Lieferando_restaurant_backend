const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});


const nameSchema = new Schema({
    name: String,
    images: [ImageSchema],
    discount: Number
})

module.exports = mongoose.model('Category', nameSchema);