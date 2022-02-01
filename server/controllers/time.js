const Time = require('../models/time')




module.exports.getTime = (req, res) => {
    Time.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
}