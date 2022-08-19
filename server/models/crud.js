const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true,
  },
  age: {
    type: Number,
    max: 100,
    min: 0,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    maxlength: 255,
    minlength: 3,
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
