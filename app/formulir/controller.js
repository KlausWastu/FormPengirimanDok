const Form = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      const form = await Form.find({ isdeleted: false });
      res.render("admin/formPengiriman/view_form", {
        title: "Formulir Pengiriman",
        form,
      });
    } catch (err) {
      console.log(err);
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/formPengiriman/create", {
        title: "Tambah Form",
      });
    } catch (err) {
      console.log(err);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const {
        pembuat,
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
        dibuat: pembuat,
        kepada,
        bagian,
        tanggal,
        jenisdok: jenisDok,
      });
      await form.save();
    } catch (err) {
      console.log(err);
    }
  },
};
