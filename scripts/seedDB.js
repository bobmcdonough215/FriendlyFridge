const mongoose = require("mongoose");
const Food = require("../models/food.js");

// This file empties the food collection and inserts the food below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/virtualFridge"
);

const foodSeed = [
  {
    itemName: "",
    note: "",
    expirationDate: "",
    date: new Date(Date.now())
  }
];

Food
  .remove({})
  .then(() => Food.collection.insertMany(foodSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
