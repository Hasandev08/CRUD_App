const { Crud, validate } = require("../models/crud");
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.password !== req.body.cPassword)
    return res.status(400).send("The passwords does not match");

  let user = await Crud.findOne({ email: req.body.email });

  if (user) return res.status(401).send({ message: "User already registered" });

  if (req.body.password !== req.body.cPassword)
    return res.status(400).send("The passwords does not match");

  user = new Crud(
    _.pick(req.body, [
      "name",
      "age",
      "country",
      "email",
      "password",
      "cPassword",
      "isAdmin",
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.cPassword = await bcrypt.hash(user.cPassword, salt);
  user.isAdmin = false;
  await user.save();

  res.send(_.pick(user, ["id", "name", "age", "country", "email", "isAdmin"]));
});

router.get("/table", async (req, res) => {
  try {
    const data = await Crud.find();
    res.status(201).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/table/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Crud.findById({ _id: id });
    console.log(user);
    res.status(201).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.patch("/edit/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const updateUser = await Crud.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateUser);
    res.status(201).send(updateUser);
  } catch {
    res.status(422).send(error);
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await Crud.findByIdAndRemove({ _id: id });
    res.status(201).send({});
  } catch {
    res.status(422).send(error);
  }
});

module.exports = router;
