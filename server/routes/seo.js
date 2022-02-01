const express = require('express');
const router = express.Router();
const seo = require('../controllers/text');
const cors = require('cors');

router.use(cors())

router.route('/')
    .get(seo.sao)

module.exports = router;