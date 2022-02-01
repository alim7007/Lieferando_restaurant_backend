const express = require('express');
const router = express.Router();
const time = require('../controllers/time')

const cors = require('cors');

router.use(cors());



router.route('/')
    .get(time.getTime)

module.exports = router;