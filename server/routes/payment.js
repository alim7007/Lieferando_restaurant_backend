const express = require('express');
const router = express.Router();
const payment = require('../controllers/payment');

const cors = require('cors');
router.use(cors());

router.route(express.json())

router.route("/")
    .post(payment.payment);

module.exports = router;
