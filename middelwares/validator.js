const ClientModel = require("../models/ClientModel");
const validationSchema = require("./ModelSchemaValidator");

const validateClientAdd = async (req, res, next) => {
  console.log(req.body);
  const { error } = validationSchema.createModelSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const emailExist = await ClientModel.findOne({ email: req.body.email });

  const phoneExist = await ClientModel.findOne({
    numTelephone: req.body.numTelephone,
  });
  if (emailExist) {
    return res.status(400).json({ message: "Email  already exists" });
  }
  if (phoneExist) {
    return res.status(400).json({ message: "phoneNumber  already exists" });
  }

  next();
};

const validateClientEdit = async (req, res, next) => {
  console.log(req.body);
  const { error } = validationSchema.editModelSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = { validateClientAdd, validateClientEdit };
