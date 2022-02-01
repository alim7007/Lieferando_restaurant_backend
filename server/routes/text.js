const express = require('express');
const router = express.Router();
const text = require('../controllers/text');
const cors = require('cors');

router.use(cors());



router.route('/')
    .get(text.index)


module.exports = router;