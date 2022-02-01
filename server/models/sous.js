const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sousSchema = new Schema({
    sous: String,
    price: Number,
    mecburi: {
        type: Boolean,
        default: "false",
        enum: [true, false]
    }
})

module.exports = mongoose.model('Sous', sousSchema);