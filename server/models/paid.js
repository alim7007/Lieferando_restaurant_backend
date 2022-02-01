const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;


const PaidSchema = new Schema({
    adsoyad: { type: String },
    title: [{ type: Array }],
    price: { type: Number },
    owner: { type: String },
    address: { type: String },
    bonus: { type: Number },
    bonusPrice: { type: Number },
    extra: { type: String },
    phone: { type: String },
    clicked: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
    time: { type: String },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = Paid = mongoose.model("Paid", PaidSchema);
