const Location = require('../models/location');

module.exports.location = async (req, res) => {
    try {
        const location = await Location.find({})
        res.json(location);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}