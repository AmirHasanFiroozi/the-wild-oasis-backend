const express = require("express");
const {
  getAllGuests,
  getOneGuest,
  deleteOneGuest,
  updateOneGuest,
  createOneGuest,
} = require("../Controller/guestsController");
const { protect } = require("../Controller/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllGuests).post(createOneGuest);
router
  .route("/:id")
  .get(getOneGuest)
  .delete(deleteOneGuest)
  .patch(updateOneGuest);

module.exports = router;
