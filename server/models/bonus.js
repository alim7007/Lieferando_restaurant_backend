const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bonusSchema = new Schema({
    bonus: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Bonus', bonusSchema);