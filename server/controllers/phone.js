const Phone = require('../models/phone')


module.exports.phone = (req, res) => {
    Phone.find({})
        .then(data => {
            res.json(data)
        })
}