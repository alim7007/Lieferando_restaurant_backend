const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const distSchema = new Schema({
    km: {
        type: String,
        enum: ["0-5km", "5-10km", "10-15km", "15-20km", "20-25km", "25-30km"]
    },
    price: {
        type: Number
    }
})

module.exports = mongoose.model("Distance", distSchema);