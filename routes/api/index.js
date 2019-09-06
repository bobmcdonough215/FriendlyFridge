const router = require("express").Router();
const fridgeRoutes = require("./fridge");

router.use("/fridge", fridgeRoutes);



module.exports = router;