const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const location = require('../controllers/location');
const cors = require('cors');


router.use(cors());


router.route('/')
    .get(catchAsync(location.location));

module.exports = router;