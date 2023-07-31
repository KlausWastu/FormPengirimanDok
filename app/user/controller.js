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
        req.session.user.role === "dokon" ||
        req.session.user.role === "user"
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
  logout: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
  viewUbahPass: async (req, res) => {
    try {
      const user = await User.findById(req.session.user.id);
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/ubahpass/ubahpass", {
        alert,
        title: "Ubah Password",
        user,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  actionUbahPass: async (req, res) => {
    try {
      const { currentpassword, newpassword } = req.body;
      const user = await User.findById(req.session.user.id);
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(newpassword, salt);
      const checkpass = await bcrypt.compare(currentpassword, user.password);
      if (checkpass) {
        await User.findOneAndUpdate(
          { _id: req.session.user.id },
          {
            password: hashpassword,
          }
        );

        req.flash("alertMessage", `Berhasil update password`);
        req.flash("alertStatus", "success");
        req.session.destroy();
        return res.redirect("/");
      } else {
        req.flash("alertMessage", "Gagal update password");
        req.flash("alertStatus", "danger");
        return res.redirect("/ubahpassword");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      return res.redirect("/");
    }
  },
};
