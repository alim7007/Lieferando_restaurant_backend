const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };


const PizzaPartsSchema = new Schema({
    ingridients: String,
    price: Number
}, opts);



module.exports = mongoose.model('PizzaParts', PizzaPartsSchema);