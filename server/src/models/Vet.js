const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  specialist: {
    type: String,
  },
  apartament: {
    type: String,
  },
  street: {
    type: String,
  },
  number: {
    type: String,
  },
  service: {
    type: [],
  },
});

exports.Vet = new mongoose.model("vet", vetSchema);
