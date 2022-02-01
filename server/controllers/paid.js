const Paid = require("../models/paid");


module.exports.payment = async (req, res) => {
    const paid = new Paid({
        adsoyad: req.body.adsoyad,
        title: req.body.title,
        price: req.body.price,
        owner: req.body.owner,
        address: req.body.address,
        phone: req.body.phone1,
        bonusPrice: req.body.bonusm,
        bonus: req.body.bonus,
        extra: req.body.extra,
        time: req.body.time
    })
    paid.save().then(order => res.json(order)
    );
}

module.exports.payid = (req, res) => {
    Paid.find({})
        .then((data) => {
            res.json(data);
            console.log(data)
        }).catch(err => {
            res.status(400);
            console.log(err);
        })
}

module.exports.clicked = (req, res) => {
    const update = { clicked: req.body.clicked }
    Paid.findByIdAndUpdate(req.params.id, update, (err, done) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        else {
            res.status(200).json("Updated")
        }
    })
}