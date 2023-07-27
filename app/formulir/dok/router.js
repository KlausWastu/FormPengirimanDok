var express = require("express");
var router = express.Router();
const { index, viewCreate, actionCreate } = require("./controller");
const { isLogin } = require("../../middleware/auth");
/* GET home page. */
router.use(isLogin);
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);

module.exports = router;
