const User = require("../Model/userModel");
const {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  createOne,
} = require("./handleFactory");

exports.getAllUsers = getAll(User, "fullName");
exports.getOneUser = getOne(User);
exports.deleteOneUser = deleteOne(User);
exports.updateOneUser = updateOne(User);
exports.createOneUser = createOne(User);
