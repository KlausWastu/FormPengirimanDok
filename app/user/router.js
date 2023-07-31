var express = require("express");
var router = express.Router();
const {
  viewSignin,
  actionSignin,
  logout,
  viewUbahPass,
  actionUbahPass,
} = require("./controller");
/* GET home page. */
router.get("/", viewSignin);
router.post("/", actionSignin);
router.get("/ubahpassword", viewUbahPass);
router.put("/ubah/:id", actionUbahPass);
router.get("/logout", logout);

module.exports = router;
