const Form = require("./model");
const Dok = require("./dok/model");
const User = require("../user/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const name = req.session.user.name;
      const form = await Form.find({
        isdeleted: false,
        "dibuat.name": name,
      });
      console.log("Form >> ", form);
      res.render("admin/formPengiriman/view_form", {
        title: "Formulir Pengiriman",
        alert,
        form,
        name: req.session.user.name,
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
      let usr = req.session.user.id;
      const user = await User.findOne({ _id: usr });
      res.render("admin/formPengiriman/create", {
        title: "Tambah Form",
        alert,
        user,
        name: req.session.user.name,
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
        jabatan,
        nama,
        kepada,
        bagian,
        tanggal,
        kebijakan,
        rencana,
        prosedur,
        sasaran,
        pedoman,
        dokpendukung,
      } = req.body;
      const jenisDok = [
        kebijakan,
        rencana,
        prosedur,
        sasaran,
        pedoman,
        dokpendukung,
      ].filter(Boolean);
      const form = new Form({
        dibuat: { name: nama, jabatan },
        kepada,
        bagian,
        tanggal,
        jenisdok: jenisDok,
      });
      await form.save();
      const FormId = form._id;
      req.flash("alertMessage", "Berhasil Membuat Formulir Pengiriman Dokumen");
      req.flash("alertStatus", "success");
      res.redirect("/dok?formId=" + FormId);
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  viewDok: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const { id } = req.params;
      const form = await Form.findOne({ _id: id });
      const dok = await Dok.find({ formulir: id });
      res.render("admin/formPengiriman/viewDok/viewdok", {
        dok,
        form,
        alert,
        name: req.session.user.name,
        title: "Dokumen",
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
};
