const express = require('express');
const router = express.Router();
const blog = require('../controllers/blog');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const cors = require('cors');

router.use(cors());



router.route('/')
    .get(catchAsync(blog.index))
    .post(blog.createCampground)

router.route('/show/:id')
    .get(catchAsync(blog.showBlog))


module.exports = router;