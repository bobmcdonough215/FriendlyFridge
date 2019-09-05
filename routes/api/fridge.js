const router = require("express").Router();
const foodController = require("../../controllers/foodController");


router.route("/")
  .get(foodController.findAll)
  .post(foodController.create);


router
  .route("/:id")
  .get(foodController.findById)
  .put(foodController.update)
  .delete(foodController.remove);

module.exports = router;


// api call
$(document).on("click", function(){
  var apiKey = "AIzaSyBdUWP93ehzmp-KWJj89ogweoQDrEp9Efs";
    var queryURL = "https://www.googleapis.com/customsearch/v1" + "&api_key=" + apiKey  + "search=image" + "q=" + netflixShow;
// + "imgSize=icon" + "imgType=photo"
})
$.ajax({
  url: queryURL,
  method: "GET"
})
// 