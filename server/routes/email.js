const express = require('express');
const router = express.Router();
const Email = require("../controllers/email")
const cors = require('cors');

router.use(cors());



router.route('/')
    .post(Email.sent);

module.exports = router;