const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fridgeSchema = new Schema({
  foodItem: { type: String, required: true },
  note: { type: String, required: true },
  expirationDate: String,
  date: { type: Date, default: Date.now }
});

const Food = mongoose.model("Food", fridgeSchema);

module.exports = Food;
