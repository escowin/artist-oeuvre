const router = require("express").Router();
const withAuth = require("../../utils/auth");
const {
  getAllArtwork,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
} = require("../../controllers/artwork-controllers");

// authguard middleware | routes below are accesible only to logged in users
router.use(withAuth);

// public & authguarded api endpoints
router.route("/").get(getAllArtwork).post(createArtwork);
router
  .route("/:id")
  .get(getArtworkById)
  .put(updateArtwork)
  .delete(deleteArtwork);

module.exports = router;
