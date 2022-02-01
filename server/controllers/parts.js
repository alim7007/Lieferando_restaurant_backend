const Parts = require('../models/parts');

module.exports.show = async (req, res) => {
    try {
        await Parts.find({})
            .then(data => {
                res.status(200).json(data)
            })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}