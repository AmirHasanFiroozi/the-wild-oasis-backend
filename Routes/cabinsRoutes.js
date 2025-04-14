const express = require("express");
const { getAllCabins } = require("../Controller/cabinsController");

const router = express.Router();

router.route('/').get(getAllCabins);

module.exports = router ;