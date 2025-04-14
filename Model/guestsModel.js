const { default: mongoose } = require("mongoose");
const validator = require("validator");

const guestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: [5, "the fullName is really short"],
    maxlength: [30, "the fullName is really long"],
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    validate: [validator.isEmail, "email is not valid"],
    unique: true,
    required: true,
  },
  nationality: {
    type: String,
    maxlength: [50, "the nationality is really long"],
    require: true,
    trim: true,
  },
  nationalID: {
    type: String,
    maxlength: [30, "the nationalID is really long"],
    unique: true,
    trim: true,
    required: true,
  },
  countryFlag: String,
});


const Guest = mongoose.model('guests' , guestSchema);

module.exports = Guest ;
