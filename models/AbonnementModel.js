const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AbonnementModel = new Schema(
  {
    application: { type: String, required: true },
    adresseMac: { type: String, required: true },
    dateDebut: { type: String, required: false, unique: true },
    dateFin: { type: String, required: true },
    periode: { type: String, required: true },
    numTelephone: { type: Number, required: false },
    files: [{ type: String, required: false }],
    clientID: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    deviceID: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
    typeAbonnID: { type: mongoose.Schema.Types.ObjectId, ref: "TypeAbon" },

    //Paiement
    etatPaiement: {
      type: String,
      default: "PAIED",
      enum: ["PAIED", "NOT_PAIED"],
    },
    servicePaiement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServicePaiement",
    },
    montant: { type: String, required: true },
    destinataire: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Abonnement", AbonnementModel);
const AbonnementName = mongoose.modelNames();
module.AbonnementName = AbonnementName;
