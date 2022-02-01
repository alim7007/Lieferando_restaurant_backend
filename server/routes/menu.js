const express = require('express');
const router = express.Router();
const menu = require('../controllers/menu');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const cors = require('cors')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const { authenticateJWT } = require('../schemas');

router.use(cors());



router.route('/', cors())
    .get(catchAsync(menu.index))
    .post(isLoggedIn, upload.array('image'), catchAsync(menu.createMenu))



router.get('/new', menu.renderNewForm)

router.route('/:id')
    .get(isLoggedIn, catchAsync(menu.showMenu))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(menu.updateMenu))
    .delete(isLoggedIn, isAuthor, catchAsync(menu.deleteMenu));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(menu.renderEditForm))



module.exports = router;