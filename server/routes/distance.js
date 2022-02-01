const express = require('express');
const router = express.Router();
const Distance = require("../controllers/distance")

const cors = require('cors');

router.use(cors());



router.route('/')
    .get(Distance.showDist);

module.exports = router;