var express = require("express");
var router = express.Router();
const { index, viewCreate, actionCreate } = require("./controller");
const multer = require("multer");
const os = require("os");

const { isLogin } = require("../../middleware/auth");
/* GET home page. */
router.use(isLogin);
router.get("/", index);
router.get("/create", viewCreate);
router.post(
  "/create",
  multer({ dest: os.tmpdir(), limits: { fileSize: 2097152 } }).single(
    "uploaddokumen"
  ),
  actionCreate
);

module.exports = router;
