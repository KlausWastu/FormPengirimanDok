var express = require("express");
var router = express.Router();
const { index, viewDok, actioStatusBaca } = require("./controller");
const { isLogin } = require("../middleware/auth");
/* GET home page. */
router.use(isLogin);
router.get("/", index);
router.get("/viewDok/:id", viewDok);
router.put("/view/:id", actioStatusBaca);

module.exports = router;
