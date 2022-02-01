const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const mailSchema = new Schema({
    title: String
});



module.exports = mongoose.model('Mail', mailSchema);