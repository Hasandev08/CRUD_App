const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 50,
    minlength: 5,
    required: true,
  },
  lastName: {
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
    maxlength: 50,
    minlength: 5,
    required: true,
    unique: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
