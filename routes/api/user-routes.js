const router = require("express").Router();
const withAuth = require("../../utils/auth");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
} = require("../../controllers/user-controllers");

// public & authguarded api endpoints
router.route("/").get(withAuth, getAllUsers).post(createUser);
router.route("/login").post(login);

// authguard middleware | routes below are accesible only to logged in users
router.use(withAuth);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
router.route("/logout").post(logout);

module.exports = router;
