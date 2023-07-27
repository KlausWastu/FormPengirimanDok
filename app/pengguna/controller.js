const bcrypt = require("bcryptjs");
const Pengguna = require("../user/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const user = await Pengguna.find({ role: ["user", "sekdir", "dokon"] });
      res.render("admin/adduser/viewPengguna", {
        title: "Pengguna",
        name: req.session.user.name,
        alert,
        user,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
};
