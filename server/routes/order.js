const express = require("express");
const router = express.Router();
const controller = require('../controllers/order');
const auth = require('../schemas');
const cors = require('cors');



router.use(cors());

router.get("/", auth, controller.index);
router.get("/:id", controller.show);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.patch("/:id", controller.update);
router.delete("/:id", controller.destroy);

module.exports = router;