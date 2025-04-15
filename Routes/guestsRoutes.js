const express = require("express");
const { getAllGuests } = require("../Controller/guestsController");

const router = express.Router();

router.route('/').get(getAllGuests);

module.exports = router ;