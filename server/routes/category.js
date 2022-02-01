const express = require('express');
const router = express.Router();
const Category = require('../controllers/category');
const cors = require('cors');


router.use(cors());



router.route('/')
    .get(Category.show);



module.exports = router;