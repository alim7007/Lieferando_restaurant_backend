const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const timeSchema = new Schema({
    title: {
        type: String,
        enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    open: Boolean,
    ClosingTime: Number,
    OpeningTime: Number,
    KendimOpen: Number,
    KendimClose: Number
})

module.exports = mongoose.model('Time', timeSchema);