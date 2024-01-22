const router = require("express").Router();
const userRoutes = require("./user-routes");
const artworkRoutes = require("./artwork-routes");
const tagRoutes = require("./tag-routes");

// API endpoints
router.use("/users", userRoutes);
router.use("/artwork", artworkRoutes);
router.use("/tags", tagRoutes);

module.exports = router;
