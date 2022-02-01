const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    lat: Number,
    lng: Number
});

module.exports = mongoose.model('Location', LocationSchema);