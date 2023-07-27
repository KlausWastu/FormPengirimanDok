var express = require("express");
var router = express.Router();
const { index, viewCreate, actionCreate, viewDok } = require("./controller");
const { isLogin } = require("../middleware/auth");
/* GET home page. */
router.use(isLogin);
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.get("/reviewDok/:id", viewDok);

module.exports = router;
