const {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  createOne,
} = require("./handleFactory");
const Guest = require("../Model/guestsModel");

exports.getAllGuests = getAll(Guest, "fullName");
exports.getOneGuest = getOne(Guest);
exports.deleteOneGuest = deleteOne(Guest);
exports.updateOneGuest = updateOne(Guest);
exports.createOneGuest = createOne(Guest);
