const { getAll } = require("./handleFactory");
const Guest = require('../Model/guestsModel');

exports.getAllGuests = getAll(Guest , 'fullName')