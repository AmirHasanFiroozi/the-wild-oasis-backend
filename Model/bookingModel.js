const { default: mongoose } = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    createAt: {
      type: Date,
      default: Date.now(),
    },
    startDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
    cabinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cabins",
    },
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guests",
    },
    hasBreakfast: {
      type: Boolean,
      default: false,
    },
    observation: String,
    isPaid: {
      type: Boolean,
      default: false,
    },
    numGuests: {
      type: Number,
      min: [0, "the number of guests can' be negative"],
      max: [50, "number of guests most be lower that 50"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
