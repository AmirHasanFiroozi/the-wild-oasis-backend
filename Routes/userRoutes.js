const express = require("express");
const {
  login,
  signup,
  logout,
  protect,
  restrictTo,
} = require("../Controller/authController");
const {
  getAllUsers,
  createOneUser,
  deleteOneUser,
  getOneUser,
  updateOneUser,
} = require("../Controller/userController");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", protect, logout);

router.use(protect, restrictTo("BUS"));

router.route("/").get(getAllUsers).post(createOneUser);
router.route("/:id").delete(deleteOneUser).get(getOneUser).patch(updateOneUser);

module.exports = router;
