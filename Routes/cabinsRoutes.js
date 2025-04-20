const express = require("express");
const {
  getAllCabins,
  getOneCabin,
  updateOneCabin,
  deleteOneCabin,
  createOneCabin,
} = require("../Controller/cabinsController");
const { protect } = require("../Controller/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllCabins).post(createOneCabin);
router
  .route("/:id")
  .get(getOneCabin)
  .patch(updateOneCabin)
  .delete(deleteOneCabin);

module.exports = router;
