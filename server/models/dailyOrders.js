const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };


const dailyOrdersSchema = new Schema({
    paketciName: String,
    musteriEmail: String,
    kacDakika: Number
}, opts);



module.exports = mongoose.model('Dayli', dailyOrdersSchema);