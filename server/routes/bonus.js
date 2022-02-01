const express = require('express');
const router = express.Router();
const Bonus = require('../controllers/bonus')

const cors = require('cors');

router.use(cors());

router.route('/')
    .get(Bonus.showBonus);

module.exports = router;