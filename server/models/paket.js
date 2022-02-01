const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaketSchema = new Schema({
    price: Number,
    owner: String,
    address: String,
    phone: String,
    paketciId: String
})

module.exports = mongoose.model('Paket', PaketSchema);