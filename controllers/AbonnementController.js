const AbonnementModel = require("../models/AbonnementModel");
const { addMonths } = require("date-fns");

const AddAbonnement = async (req, res) => {
  try {
    const { email, application } = req.body;
    const existAbonn = await AbonnementModel.findOne({ application });
    if (existAbonn)
      return res.status(409).json({
        Message: "Abonnement already exist",
        Success: false,
      });

    const date_1 = new Date(req.body.dateDebut);
    const periode = req.body.periode;
    const date_2 = addMonths(date_1, periode);

    const newAbonn = new AbonnementModel({
      ...req.body,
      files: req.files.Documentation[0].path,
      dateFin: date_2,
    });
    const createdAbonn = await newAbonn.save();

    return res.status(200).json({
      message: "Abonn added  successfully",
      success: true,
      data: createdAbonn,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const getAbonnemtByClientID = async (req, res) => {
  try {
    const id = req.params.id;
    const AbonnementsList = await AbonnementModel.find({ clientID: id });

    return res.status(200).json({
      message: "Abonn found  successfully",
      success: true,
      data: AbonnementsList,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = { AddAbonnement, getAbonnemtByClientID };
