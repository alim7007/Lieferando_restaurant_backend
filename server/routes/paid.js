const express = require('express');
const router = express.Router();
const paid = require('../controllers/paid')


const cors = require('cors');
router.use(cors());


router.route("/")
    .post(paid.payment)
    .get(paid.payid)

router.route("/:id")
    .put(paid.clicked)


module.exports = router;
