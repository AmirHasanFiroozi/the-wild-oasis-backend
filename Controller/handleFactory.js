const APIFeature = require("../Utilities/APIFeature");
const catchAsync = require("../Utilities/catchAsync");

exports.getAll = (Model , field) =>
  catchAsync(async (req, res, next) => {
    const items = Model.find();
    
    const features = new APIFeature(req.query, items);
    features.Filter().Search(field).Sort().FieldLimit().Pagination();

    const cabins = await features.items;

    res.status(200).json({
      status: "success",
      data: cabins,
    });
  });
