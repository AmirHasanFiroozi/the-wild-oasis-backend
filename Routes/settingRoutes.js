const express = require("express");

const {
  getSetting,
  updateSetting,
} = require("../Controller/settingController");
const { protect } = require("../Controller/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(getSetting).patch(updateSetting);

module.exports = router;
