const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AbonnementModel = new Schema(
  {
    application: { type: String, required: true },
    adresseMac: { type: String, required: true },
    dateDebut: { type: String, required: false, unique: true },
    dateFin: { type: String, required: true },
    periode: { type: String, required: true },
    files: [{ type: String, required: false }],
    clientID: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    deviceID: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
    typeAbonnID: { type: mongoose.Schema.Types.ObjectId, ref: "TypeAbon" },

    //Paiement
    etatPaiement: {
      type: String,
      default: "NOT_PAIED",
      enum: ["PAIED", "NOT_PAIED"],
    },
    servicePaiement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServicePaiement",
    },
    montant: { type: String, required: false },
    destinataire: { type: String, required: false },
  },
  { timestamps: true }
);

AbonnementModel.pre(/^find/, function (next) {
  this.populate("clientID");
  this.populate("deviceID");
  this.populate("typeAbonnID");
  this.populate("servicePaiement");

  next();
});
module.exports = mongoose.model("Abonnement", AbonnementModel);
const AbonnementName = mongoose.modelNames();
module.AbonnementName = AbonnementName;
