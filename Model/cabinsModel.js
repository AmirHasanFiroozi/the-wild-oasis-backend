const { default: mongoose } = require("mongoose");

const cabinsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "cabin most have name"],
    maxlength: [10, "you cabin name is too long"],
    unique: true,
    trim: true,
  },
  maxCapacity: {
    type: Number,
    require: true,
  },
  regularPrice: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
    validate: {
      validator: function (val) {
        if(val)
          return this.regularPrice > val;
        return true
      },
      message: "discount should be lower that price",
    },
  },
  Image: {
    type: String,
    trim: true,
    require: true,
  },
  description: {
    type: String,
    trim: true,
    require: true,
  },
});

const Cabin = mongoose.model("cabins", cabinsSchema);

module.exports = Cabin;
