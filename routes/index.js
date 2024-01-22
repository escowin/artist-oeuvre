const router = require("express").Router();
const apiRoutes = require("./api")

router.use("/api", apiRoutes);

// error handling for wild card endpoints
router.use((req, res) => res.status(404).json({ message: "invalid route" }));
  
module.exports = router;
