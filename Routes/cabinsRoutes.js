const express = require("express");
const { getAllCabins, searchCabins } = require("../Controller/cabinsController");

const router = express.Router();

router.route('/').get(getAllCabins);

module.exports = router ;