const Category = require('../models/category')


module.exports.show = (req, res) => {
    Category.find({})
        .populate('sous')
        .then(data => {
            res.json(data)
        })
}