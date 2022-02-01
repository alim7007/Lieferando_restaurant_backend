const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxf5268c0f53644472a9b92825ef31e138.mailgun.org';
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
const Mail = require('../models/mail')
const Save = require('../models/dailyOrders')


module.exports.sent = async (req, res) => {
    const mail = await Mail.find({})
        .then(data1 => {
            let { phone, name, email, time } = req.body;
            const data = {
                from: 'no-reply@liferando.com',
                to: email,
                subject: 'We received your order',
                html: `
                <h2>${data1[0].title} ${time} minutes</h2>
                <h3> Your delivery man is ${name} you can call him ${phone}</h3>
            `
            };
            console.log(data)
            mg.messages().send(data, function (err, body) {
                res.json({ msg: "Email has been sent!!!" })
            });
        })
    const newOrder = new Save({
        paketciName: req.body.name,
        musteriEmail: req.body.email,
        kacDakika: req.body.time
    })
    newOrder.save().then(console.log("done"));
}