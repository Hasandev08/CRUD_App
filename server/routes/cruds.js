const { Crud, validate } = require("../models/crud");
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.password !== req.body.cPassword)
    return res.status(400).send("The passwords does not match");

  let user = await Crud.findOne({ email: req.body.email });

  if (user) return res.status(401).send({ message: "User already registered" });
  
  user = new Crud(
    _.pick(req.body, [
      "name",
      "age",
      "country",
      "email",
      "password",
      "cPassword",
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.cPassword = await bcrypt.hash(user.cPassword, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["id", "name", "age", "country", "email"]));
});

router.get("/table", async (req, res) => {
  try {
    const data = await Crud.find();
    res.status(201).json(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/table/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Crud.findById({ _id: id });
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateUser = await Crud.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateUser);
    res.status(201).json(updateUser);
  } catch {
    res.status(422).json(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateUser = await Crud.findByIdAndRemove({ _id: id });
    console.log(updateUser);
    res.status(201).json(updateUser);
  } catch {
    res.status(422).json(error);
  }
});

module.exports = router;
