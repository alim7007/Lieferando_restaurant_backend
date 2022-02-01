const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TextSchema = new Schema({
    a1: String,
    a2: String,
    a3: String,
    a4: String,
    a5: String,
    a6: String,
    a7: String,
    a8: String,
    a9: String,
    a10: String,
    a11: String,
    a12: String,
    a13: String,
    a14: String,
    a15: String,
    a16: String,
    a17: String,
    a18: String
})

module.exports = mongoose.model('Text', TextSchema);