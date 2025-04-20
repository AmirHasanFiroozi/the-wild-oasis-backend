const Setting = require("../Model/settingModel");
const catchAsync = require("../Utilities/catchAsync");
const AppError = require("../Utilities/AppError");

exports.getSetting = catchAsync(async (req, res, next) => {
  const setting = (await Setting.find())[0];
  if (!setting) {
    const defaultSetting = await Setting.create({
      type: "setting",
      minBookingNumber: 6,
      maxBookingNumber: 10,
      maxGuestsPerBooking: 2,
      breakfastPrice: 12.5,
    });
    return res.status(200).json({
      status: "success",
      data: defaultSetting,
    });
  }
  res.status(200).json({
    status: "success",
    data: setting,
  });
});

exports.updateSetting = catchAsync(async (req, res, next) => {
  const allowFields = [
    "minBookingNumber",
    "maxBookingNumber",
    "maxGuestsPerBooking",
    "breakfastPrice",
  ];
  const filteredBody = Object.keys(req.body).reduce((obj, key) => {
    if (allowFields.includes(key)) {
      obj[key] = req.body[key];
    }
    return obj;
  }, {});
  const newSetting = await Setting.findOneAndUpdate(
    { type: "setting" },
    filteredBody,
    {
      new: true,
      runValidator: true,
      upsert: true,// create if don't exist
    }
  );
  res.status(200).json({
    status: "success",
    data: newSetting,
  });
});
