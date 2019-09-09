const express = require("express");
const bodyParser = require('body-parser')
const session = require('express-session')
const dbConnection = require('./client/dbconnection') 
const MongoStore = require('connect-mongo')(session)
const passport = require("./client/src/utils/passport");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");
var db = require("./models");
const user = require('./routes/user');
var logger = require("morgan");


app.use(logger("dev"));


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())


// Sessions
app.use(
	session({
		secret: 'philly-special', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Define API routes here
app.use("/api", routes);
app.use('/user', user)

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/virtualFridge";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

mongoose.connection.once("open", function(){
  console.log("Connection has been made to the database");
}).on("error", function(error){
  console.log("Connection error:", error);
})

// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
// app.post("/submit", function(req, res) {
//   // Create a new user using req.body
//   User.create(req.body)
//     .then(function(dbUser) {
//       // If saved successfully, send the the new User document to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send the error to the client
//       res.json(err);
//     });
// });
// Routes

// Route for retrieving all Notes from the db
app.get("/fridges", function(req, res) {
  // Find all Notes
  db.Fridge.find({})
    .then(function(dbFridge) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbFridge);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for retrieving all Users from the db
app.get("/user", function(req, res) {
  // Find all Users
  db.User.find({})
    .then(function(dbUser) {
      // If all Users are successfully found, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// User.findById(id)
// .populate({ path: 'rol_list', model: Rol1 })
// .exec(function(err, user) {
//   console.log(user);
//   done(err, user);
// });

// Route for saving a new Note to the db and associating it with a User
app.post("/submit", function(req, res) {
  // Create a new Note in the db
  db.Fridge.create(req.body)
    .then(function(dbFridge) {
      console.log("Fridge: " + dbFridge);
      // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      // return
       db.User.findOneAndUpdate({}, { $push: { fridges: dbFridge._id } }, { new: true });
      
    })
    .then(function(dbFridge) {
      // If the User was updated successfully, send it back to the client
      res.json(dbFridge);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route to get all User's and populate them with their notes
app.get("/populatefridge", function(req, res) {
  // Find all users
  db.User.find({})
    // Specify that we want to populate the retrieved users with any associated notes
    .populate("fridges")
    .then(function(dbUser) {
      // If able to successfully find and associate all Users and Notes, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// app.post("/api/fridges", function(req, res) {
 
//   console.log("Food route: create:")
//   console.log(req.body);
//   db.Fridge
//     .create(req.body)
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));

// })
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
