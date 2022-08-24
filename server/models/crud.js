const mongoose = require("mongoose");

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
    min: 10,
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
});

const Crud = mongoose.model("Crud", crudSchema);

exports.Crud = Crud;
