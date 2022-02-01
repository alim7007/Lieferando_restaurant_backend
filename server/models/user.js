const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Order = require('./order')


const UserSchema = new Schema({
    bonusFull: {
        type: Number,
        default: 0
    },
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin", "administrator", "paketci"]
    },
    created: {
        type: Date,
        default: Date.now
    },

});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);