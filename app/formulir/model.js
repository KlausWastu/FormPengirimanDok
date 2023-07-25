const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
let formPengirimanDokSchema = mongoose.Schema(
  {
    dibuat: { type: String },
    kepada: { type: String },
    bagian: { type: String },
    tanggal: { type: String },
    jenisdok: { type: [String] },
    isdeleted: {
      type: Boolean,
      default: false,
    },
    statusbaca: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
formPengirimanDokSchema.plugin(mongoose_delete, {
  deleteAt: true,
});
module.exports = mongoose.model("Formulir", formPengirimanDokSchema);
