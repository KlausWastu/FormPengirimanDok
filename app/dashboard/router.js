var express = require("express");
var router = express.Router();
const { index, viewCreate } = require("./controller");
const { isLogin } = require("../middleware/auth");
/* GET home page. */
router.use(isLogin);
router.get("/", index);
// router.get("/create", viewCreate);

module.exports = router;
