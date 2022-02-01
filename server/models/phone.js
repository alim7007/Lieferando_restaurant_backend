const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const phoneSchema = new Schema({
    phone: String,
    email: String,
    terms: String,
    servisYap: {
        type: Boolean,
        default: true,
        enum: [true, false]
    }
})

module.exports = mongoose.model("Phone", phoneSchema);