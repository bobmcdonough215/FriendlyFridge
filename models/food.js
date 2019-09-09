// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const foodSchema = new Schema({
  foodItem: { type: String, required: true },
  // note: { type: String, required: true },
  expirationDate: String,
  foodurl: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// const Food = mongoose.model("Food", foodSchema);

// module.exports = Food;
