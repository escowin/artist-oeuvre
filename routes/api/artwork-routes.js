const router = require("express").Router();
const withAuth = require("../../utils/auth");
const {
  getAllArtwork,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
} = require("../../controllers/artwork-controllers");

// public & authguarded api endpoints
router.route("/").get(withAuth, getAllArtwork).post(createArtwork);
router
  .route("/:id")
  .get(withAuth, getArtworkById)
  .put(withAuth, updateArtwork)
  .delete(withAuth, deleteArtwork);

module.exports = router;
