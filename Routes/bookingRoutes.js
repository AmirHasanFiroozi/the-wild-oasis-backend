const express = require("express");
const {
  getAllBookings,
  createOneBooking,
  deleteOneBooking,
  updateOneBooking,
  getOneBooking,
} = require("../Controller/bookingController");
const { protect } = require("../Controller/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllBookings).post(createOneBooking);
router
  .route("/:id")
  .delete(deleteOneBooking)
  .patch(updateOneBooking)
  .get(getOneBooking);

module.exports = router;
