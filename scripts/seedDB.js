const mongoose = require("mongoose");
const db = require("../models");

const Fridge = require("../models/userFridge.js");
const User = require("../models/user.js");


// This file empties the food collection and inserts the food below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/virtualFridge"
);

const fridgeSeed = [
  {
    foodItem: "",
    note: "",
    expirationDate: "",
    date: new Date(Date.now())
  }
];


db.Fridge
  .remove({})
  .then(() => db.Fridge.collection.insertMany(fridgeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  const userSeed = [
    {
      userName: "",
      password: "",
    }
  ];

  db.User
  .remove({})
  .then(() => db.User.collection.setMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
