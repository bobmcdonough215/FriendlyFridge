import axios from "axios";

export default {

  // Saves a book to the database
  saveFood: function(fridgeData) {
      console.log("API.js in /utils:")
      console.log(fridgeData)
    return axios.post("/submit", fridgeData);
  },

  getFoods: function() {
    return axios.get("/populatefridge");
  },

  deleteFood: function(foodId) {
     return axios.delete("/api/api/fridges/" + foodId);
  }
  // return axios.post("/fridges/", fridgeData);

};

