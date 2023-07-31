var express = require("express");
var router = express.Router();
const {
  index,
  viewtambahPengguna,
  tambahPengguna,
  status,
} = require("./controller");
const { isLogin } = require("../middleware/auth");
/* GET home page. */
router.use(isLogin);
router.get("/", index);
router.get("/create", viewtambahPengguna);
router.post("/create", tambahPengguna);
router.put("/status/:id", status);

module.exports = router;
