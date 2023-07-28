const Form = require("../model");
const Dok = require("./model");
const path = require("path");
const fs = require("fs");
const config = require("../../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const FormID = req.query.formId;
      const form = await Form.findOne({ _id: FormID });
      const dok = await Dok.find({ formulir: FormID });

      res.render("admin/formPengiriman/dokpengiriman/view_dok", {
        title: "Dokumen",
        form,
        name: req.session.user.name,
        alert,
        dok,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/formPengiriman/dokpengiriman/create", {
        title: "Tambah Dokumen",
        name: req.session.user.name,
        alert,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const {
        namadok,
        kodedok,
        jumlah,
        statusrevisi,
        tglberlaku,
        salinanNo,
        formulir,
      } = req.body;

      let tmp_path = req.file.path;
      let filename = req.file.originalname;
      let target_path = path.resolve(
        config.rootPath,
        `public/upload/${filename}`
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);
      src.on("end", async () => {
        const dok = new Dok({
          namadok,
          kodedok,
          jumlah,
          statusrevisi,
          tglberlaku,
          nosalinan: salinanNo,
          dokumen: filename,
          formulir,
        });
        await dok.save();
        req.flash("alertMessage", "Berhasil Menambahkan Dokumen");
        req.flash("alertStatus", "success");
        res.redirect("/dok?formId=" + formulir);
      });
    } catch (err) {
      console.log(err);
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
};
