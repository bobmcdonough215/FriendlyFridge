const router = require("express").Router();
const fridgeRoutes = require("./fridge");

router.use("/myfridge", fridgeRoutes);

module.exports = router;