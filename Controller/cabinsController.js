const Cabin = require("../Model/cabinsModel");
const catchAsync = require("../Utilities/catchAsync");
const { getAll } = require("./handleFactory");

exports.getAllCabins = getAll(Cabin);