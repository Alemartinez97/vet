const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
  detail: {
    type: String,
  },
  date: {
    type: String,
  },
  phone: {
    type: String,
  }
});

exports.Reserve = new mongoose.model("reserve", reserveSchema);
