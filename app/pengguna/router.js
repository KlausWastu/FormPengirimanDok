var express = require("express");
var router = express.Router();
const { index } = require("./controller");
/* GET home page. */
router.get("/", index);
// router.get("/", viewSignin);
// router.post("/", actionSignin);
// router.get("/create", viewCreate);
// router.post("/create", actionCreate);

module.exports = router;
