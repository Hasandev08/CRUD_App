const { Crud } = require("../models/crud");
const auth = require("../middleware/auth")
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, age, country, email } = req.body;

  if (!name || !age || !country || !email) {
    res.status(404).send("Some data is missing");
  }

  try {
    const preuser = await Crud.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(404).send("The user already exists");
    } else {
      let addUser = new Crud({
        name,
        age,
        country,
        email,
      });

      addUser = await addUser.save();
      res.status(201).json(addUser);
      console.log(addUser);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/table", async (req, res) => {
  try {
    const data = await Crud.find();
    res.status(201).json(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/table/:id", auth, async (req, res) => {
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
