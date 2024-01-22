const router = require("express").Router();
const userRoutes = require("./user-routes");
const artworkRoutes = require("./artwork-routes")

// API endpoints
router.use("/users", userRoutes);
router.use("/artwork", artworkRoutes);

module.exports = router;
