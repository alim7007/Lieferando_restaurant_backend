const stripe = require("stripe")("sk_test_51IBmoSFMbvzHsJfjdKV1ifn6fuNoLFtjTeVxAXS6zU08tPbNpiXUBSud5quLpqVZPyLqyrgfjtzmgJB0amHUUciB00mRgVl6Mj");
const { v4: uuid } = require('uuid')

module.exports.payment = (req, res) => {
    const { product, token } = req.body;
    const idempotencyKey = uuid()
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        const paid = stripe.charges.create({
            amount: product.price * 100,
            currency: 'eur',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name
        }, { idempotencyKey })
    })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
};