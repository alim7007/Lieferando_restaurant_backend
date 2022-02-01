const Order = require("../models/order");
const _ = require("lodash");
const StateMachine = require("javascript-state-machine");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

function createStateMachine(order) {
    return new StateMachine({
        init: order.status,
        transitions: [
            { name: "cancelled", from: "placed", to: "cancelled" },
            { name: "processing", from: "placed", to: "processing" },
            { name: "in_route", from: "processing", to: "in_route" },
            { name: "delivered", from: "in_route", to: "delivered" },
            { name: "received", from: "delivered", to: "received" }
        ]
    });
}

function handleError(res, err) {
    return res.status(500).send(err);
}

module.exports.index = (req, res) => {
    Order.find()
        .sort({ date: -1 })
        .then(orders => res.json(orders));
}


// Get a single order
module.exports.show = function (req, res) {
    Order.findById(req.params.id)
        .exec(function (err, order) {
            if (err) {
                return handleError(res, err);
            }

            if (!order) {
                return res.send(404);
            }

            return res.json(order);
        });
};
// module.exports.createOrder = (req, res) => {
//     Order.findById(req.params.id)
//         .then(order => {
//             (order.title = req.body.title),
//                 (orde.desc = req.body.description),
//                 (order.price = req.body.price),
//                 (order.id = req.body.id),
//                 (order.user = req.body.user),
//                 (order.sizePrice = req.body.sizePrice)

//             order
//                 .save()
//                 .then(() => res.json("Order updated!"))
//                 .catch(err => {
//                     res.status(400).json(`Error : ${err}`);
//                 });
//         })
//         .catch(err => res.status(400).json(`Error : ${err}`));
// }

module.exports.create = (req, res) => {
    const newOrder = new Order({
        title: req.body.title,
        sizePrice: req.body.sizePrice,
        price: req.body.price,
        desc: req.body.desc,
        owner: req.body.owner,
        count: req.body.count,
        sous: req.body.souses
    });

    newOrder.save().then(order => res.json(order));
};


module.exports.update = function (req, res) {
    if (req.body.id) {
        delete req.body.id;
    }
    Order.findById(req.params.id, function (err, order) {
        if (err) {
            return handleError(res, err);
        }
        if (!order) {
            return res.send(404);
        }
        const fsm = createStateMachine(order);
        if (fsm.cannot(req.body.status))
            return res.status(403).json({
                status: `Not a valid transition from ${order.status} to ${req.body.status}.`
            });
        const updated = _.merge(order, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }

            return res.json(200, order);
        });
    });
};

module.exports.destroy = function (req, res) {
    Order.findById(req.params.id, function (err, order) {
        if (err) {
            return handleError(res, err);
        }
        if (!order) {
            return res.status(404);
        }
        order.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send("Deleted");
        });
    });
};