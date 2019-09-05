import axios from "axios";

export default {

  // Saves a book to the database
  saveFood: function(fridgeData) {
      console.log("API.js in /utils:")
      console.log(fridgeData)
    return axios.post("/api/fridge", fridgeData);
  }
};



// api call
// $(document).on("click", function(){
//     var apiKey = "AIzaSyBdUWP93ehzmp-KWJj89ogweoQDrEp9Efs";
//       var queryURL = "https://www.googleapis.com/customsearch/v1" + "&api_key=" + apiKey  + "search=image" + "q=" + netflixShow;
//   // + "imgSize=icon" + "imgType=photo"
//   })
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })

//   npm date time
// date bought > experation date show green
// date bought === experation date show yellow
// date bought < experation date show red
