const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  amount: Number,
  type: {
    type: String,
    enum: ["income", "expense"],
  },
  category: String,
  date: Date,
  note: String,
});

module.exports = mongoose.model("Record", recordSchema);
