const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };


const SeoSchema = new Schema({
    titletag: String,
    metaDescription: String,
    openGraphTag: String
})

module.exports = mongoose.model('Seo', SeoSchema);