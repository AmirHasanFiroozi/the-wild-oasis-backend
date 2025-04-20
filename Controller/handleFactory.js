const APIFeature = require("../Utilities/APIFeature");
const catchAsync = require("../Utilities/catchAsync");
const AppError = require("../Utilities/AppError");

exports.getAll = (Model, field, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let items = Model.find();
    if (populateOptions) items = items.populate(populateOptions);
    const features = new APIFeature(req.query, items);
    if (field && field !== "_") {
      features.Search(field);
    }
    features.Filter().Sort().FieldLimit().Pagination();

    const cabins = await features.items;

    res.status(200).json({
      status: "success",
      data: cabins,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      return next(new AppError("there is no document with this id", 404));
    }
    res.status(200).json({
      status: "success",
      data: item,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) {
      return next(new AppError("the item is not defined"));
    }
    res.status(200).json({
      status: "success",
      message: "element successfully deleted",
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newItem = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        created: newItem,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });

    if (!updatedItem) {
      return next(new AppError("there is not any document with this Id", 404));
    }

    res.status(201).json({
      status: "success",
      data: {
        updatedDoc: updatedItem,
      },
    });
  });
