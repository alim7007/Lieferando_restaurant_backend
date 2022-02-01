const Paket = require('../models/paket')


module.exports.createPaket = async (req, res) => {
    const paid = new Paket({
        price: req.body.price,
        owner: req.body.owner,
        address: req.body.address,
        phone: req.body.phone,
        paketciId: req.body.id
    });
    await paid.save().then(data => res.json(data));
}

module.exports.pay = async (req, res) => {
    const menu = await Paket.find({});
    res.json(menu);
}
