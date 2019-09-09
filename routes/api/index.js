const router = require("express").Router();
const fridgeRoutes = require("./fridge");

router.use("/fridges", fridgeRoutes);



module.exports = router;