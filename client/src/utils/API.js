import axios from "axios";

export default {

  // Saves a book to the database
  saveFood: function(fridgeData) {
      console.log("API.js in /utils:")
      console.log(fridgeData)
    return axios.post("/api/fridge", fridgeData);
  }
};