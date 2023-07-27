const bcrypt = require("bcryptjs");
const User = require("./model");

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/signin/signin", {
          title: "Signin",
          alert,
        });
      } else if (
        req.session.user.role === "admin" ||
        req.session.user.role === "sekdir" ||
        req.session.user.role === "dokon"
      ) {
        res.redirect("/dashboard");
      }
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await User.findOne({ email: email });
      if (check) {
        if (check.status === "Y") {
          const checkpassword = await bcrypt.compare(password, check.password);
          if (checkpassword) {
            req.session.user = {
              id: check._id,
              email: check.email,
              role: check.role,
              name: check.name,
            };
            if (
              check.role === "admin" ||
              check.role === "sekdir" ||
              check.role === "dokon"
            ) {
              res.redirect("/dashboard");
            } else {
              res.redirect("/");
            }
          } else {
            req.flash("alertMessage", `Kata Sandi yang anda masukan salah`);
            req.flash("alertStatus", "danger");
            res.redirect("/");
          }
        } else {
          req.flash(
            "alertMessage",
            `Akun anda di NonAktifkan, silahkan hubungi admin `
          );
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", `Email yang anda masukan salah`);
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
};
