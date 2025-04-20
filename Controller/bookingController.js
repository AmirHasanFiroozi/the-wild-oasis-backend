const Booking = require('../Model/bookingModel');
const { getAll, getOne, deleteOne, updateOne, createOne } = require('./handleFactory');

exports.getAllBookings = getAll(Booking , "_" , "cabinId guestId");
exports.getOneBooking = getOne(Booking);
exports.deleteOneBooking = deleteOne(Booking);
exports.updateOneBooking = updateOne(Booking);
exports.createOneBooking = createOne(Booking);