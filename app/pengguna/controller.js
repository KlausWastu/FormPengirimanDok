const bcrypt = require("bcryptjs");
const Pengguna = require("../user/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/adduser/viewPengguna", {
        title: "Pengguna",
        name: req.session.user.name,
        alert,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
};
