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
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  viewtambahPengguna: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/adduser/create", {
        title: "Tambah Pengguna",
        name: req.session.user.name,
        alert,
        role: req.session.user.role,
      });
    } catch (err) {
      console.log(err);
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  tambahPengguna: async (req, res) => {
    try {
      const { email, password, nama, jabatan, role } = req.body;
      const user = await Pengguna.findOne({ email });
      if (user) {
        req.flash("alertMessage", "Email sudah ada");
        req.flash("alertStatus", "success");
        res.redirect("/");
      } else {
        let hashpass = await bcrypt.hash(password, 10);
        const pengguna = await Pengguna({
          email,
          password: hashpass,
          name: nama,
          jabatan,
          role,
        });
        let Role;
        if (role === "user") {
          Role = "User";
        } else if (role === "sekdir") {
          Role = "Sekertaris Direksi";
        } else if (role === "dokon") {
          Role = "Dokumen Kontrol";
        }
        await pengguna.save();
        req.flash(
          "alertMessage",
          `Berhasil menambahkan ${nama} menjadi ${Role}`
        );
        req.flash("alertStatus", "success");
        res.redirect("/pengguna");
      }
    } catch (err) {
      console.log(err);
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  status: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
      const user = await Pengguna.findOne({ _id: id });
      await Pengguna.findOneAndUpdate({ _id: id }, { status });
      req.flash("alertMessage", `Status ${user.name} telah diubah`);
      req.flash("alertStatus", "success");
      res.redirect("/pengguna");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pengguna");
    }
  },
};
