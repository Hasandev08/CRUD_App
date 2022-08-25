const { Crud } = require("../models/crud");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Crud.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({
      message: "Invalid Email or Password",
    });

  let validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({message: "Invalid Email or Password"});

  const token = user.generateAuthToken();

  res.send({ token: token });
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
