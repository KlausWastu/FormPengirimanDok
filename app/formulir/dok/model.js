const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
let PengirimanDokSchema = mongoose.Schema(
  {
    namadok: { type: String },
    kodedok: {
      type: String,
    },
    jumlah: {
      type: String,
    },
    statusrevisi: {
      type: String,
    },
    tglberlaku: {
      type: String,
      require: [true | "Tanggal harus di isi"],
    },
    nosalinan: {
      type: String,
      require: [true | "Perihal harus di isi"],
    },
    formulir: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Formulir",
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
PengirimanDokSchema.plugin(mongoose_delete, {
  deleteAt: true,
});
module.exports = mongoose.model("Dokumen", PengirimanDokSchema);
