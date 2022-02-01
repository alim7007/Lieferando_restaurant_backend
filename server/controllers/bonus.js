const Bonus = require('../models/bonus')

module.exports.showBonus = (req, res) => {
    Bonus.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
}