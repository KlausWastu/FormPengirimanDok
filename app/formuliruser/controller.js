const Form = require("../formulir/model");
const Dok = require("../formulir/dok/model");
module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const name = req.session.user.name;
      const form = await Form.find({ isdeleted: false, kepada: name });
      res.render("admin/formuser/formuser", {
        title: "Formulir Pengiriman Masuk",
        alert,
        form,
        name: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      console.log(err);
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
      res.render("admin/formuser/dok/dokumenuser", {
        dok,
        form,
        alert,
        name: req.session.user.name,
        title: "Dokumen",
        role: req.session.user.role,
      });
    } catch (err) {
      console.log(err);
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
};
