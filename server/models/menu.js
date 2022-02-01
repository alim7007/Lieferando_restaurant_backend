const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});


const sizeSchema = new Schema({
    boy: {
        type: String,
        enum: ["S", "M", "L", "X", "XL", "XXL"]
    },
    price: {
        type: Number
    },
    bonusPrice: {
        type: Number
    }
})




ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const MenuSchema = new Schema({
    title: String,
    stock: {
        type: Boolean,
        default: "false",
        enum: [true, false]
    },
    discount: {
        type: Number
    },
    bonusPrice: {
        type: Number
    },
    ingridients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PizzaParts'
        }
    ],
    sous: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sous'
        }
    ],
    size: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Size'
        }
    ],
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    size: [sizeSchema],
    quantity: {
        type: Number
    },
    images: [ImageSchema],
    count: { type: Number },
    price: {
        type: Number
    },
    description: String,
    OpeningTime: Number,
    ClosingTime: Number
}, opts);


module.exports = mongoose.model('Menu', MenuSchema);