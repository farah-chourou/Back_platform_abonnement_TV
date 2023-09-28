const Joi = require("joi");

const createModelSchema = Joi.object({
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  email: Joi.string().email().required(),
  pays: Joi.string().required(),
  envoie: Joi.string().required(),
  numTelephone: Joi.number(),
  note: Joi.string(),
});

const editModelSchema = Joi.object({
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  email: Joi.string().email(),
  pays: Joi.string().required(),
  envoie: Joi.string(),
  numTelephone: Joi.number(),
  note: Joi.string(),
});

module.exports = {
  createModelSchema,
  editModelSchema,
};
