const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  itemName: { type: String, required: true },
  note: { type: String, required: true },
  expirationDate: String,
  date: { type: Date, default: Date.now }
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
