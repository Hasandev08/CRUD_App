const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const crudSchema = new mongoose.Schema({
  name: {
    maxlength: 50,
    type: String,
    minlength: 3,
    required: true,
  },
  age: {
    type: Number,
    max: 99,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    maxlength: 50,
    minlength: 5,
    required: true,
  },
  email: {
    type: String,
    maxlength: 255,
    minlength: 5,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
  },
  cPassword: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean
  }
});

crudSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const Crud = mongoose.model("Crud", crudSchema);

function validateCrud(crud) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
    age: Joi.number().integer().required(),
    country: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    cPassword: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(crud, schema);
}

exports.Crud = Crud;
exports.validate = validateCrud;
