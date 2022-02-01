const express = require('express');
const router = express.Router();
const cors = require('cors');
const Phone = require('../controllers/phone')

router.use(cors());



router.route('/')
    .get(Phone.phone);


module.exports = router;