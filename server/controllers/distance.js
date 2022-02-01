const Distance = require("../models/distance")


module.exports.showDist = (req, res) => {
    Distance.find()
        .then(data => {
            res.json(data)
        })
}