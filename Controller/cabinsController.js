const Cabin = require("../Model/cabinsModel");
const {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  createOne,
} = require("./handleFactory");

exports.getAllCabins = getAll(Cabin, "name");
exports.getOneCabin = getOne(Cabin);
exports.deleteOneCabin = deleteOne(Cabin);
exports.updateOneCabin = updateOne(Cabin);
exports.createOneCabin = createOne(Cabin);
