const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
} = require("../controller/userCOntroller");

const { protect, admin } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .get(protect, admin, getUserByID)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

module.exports = router;
