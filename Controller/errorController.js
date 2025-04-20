const AppError = require("../Utilities/AppError");

const handleCastErrors = (error) => {
  const message = `Invalid ${error.path} = ${error.value}`;
  return new AppError(message, 400);
};

const handelDuplicateKeyError = (error) => {
  const value = error.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate value : ${value} please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrors = (error) => {
  const errors = Object.values(error.errors)
    .map((el) => el.message)
    .join(" | ");
  return new AppError(`${errors}`, 400);
};

const handelJsonWebTokenError = () =>
  new AppError("the token is not correct. Please log in again!", 401);

const handleTokenExpiredError = () =>
  new AppError("the token was expired please log in again", 401);

const sendErrorDev = (err, req, res) => {
  // for API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      err,
    });
  }

  // for render website (not use for CSR websites but good if be here)
  return res.status(err.statusCode).json({
    title: "something went wrong",
    message: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.log("Error 💥💥💥💥", err);

    return res.status(err.statusCode).json({
      message: "error",
      title: "something went wrong",
    });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      title: "something went wrong",
      message: err.message,
    });
  }
  console.log("Error 💥💥💥💥", err);

  return res.status(err.statusCode).json({
    title: "something went wrong",
    message: "something went very wrong please try again later",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    // send error for development
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    // send error for production
    let error = {
      ...err,
      message: err.message,
      stack: err.stack,
      name: err.name,
      code: err.code,
      errmsg: err.errmsg,
    };

    if (error.code === 11000) error = handelDuplicateKeyError(error);
    if (error.name === "CastError") error = handleCastErrors(error);
    if (error.name === "ValidationError") error = handleValidationErrors(error);
    if (error.name === "JsonWebTokenError") error = handelJsonWebTokenError();
    if (error.name === "TokenExpiredError") error = handleTokenExpiredError();
    sendErrorProd(error, req, res);
  }
};
