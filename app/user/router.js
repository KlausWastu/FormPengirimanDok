var express = require("express");
var router = express.Router();
const { viewSignin, actionSignin, logout } = require("./controller");
/* GET home page. */
router.get("/", viewSignin);
router.post("/", actionSignin);
router.get("/logout", logout);

module.exports = router;
