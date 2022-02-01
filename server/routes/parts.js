const express = require('express');
const router = express.Router();
const parts = require('../controllers/parts');
const cors = require('cors');



router.use(cors());



router.route('/')
    .get(parts.show);

module.exports = router;