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


