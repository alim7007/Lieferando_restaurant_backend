const express = require('express');
const router = express.Router();
const paid = require('../controllers/paket')


const cors = require('cors');
router.use(cors());


router.route("/")
    .get(paid.pay)
    .post(paid.createPaket);


module.exports = router;
