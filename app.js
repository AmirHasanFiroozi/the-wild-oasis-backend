// import from the libraries
const compression = require("compression");
const cookieParser = require("cookie-parser");
const express = require("express");
const ExpressMongoSanitize = require("express-mongo-sanitize");
const { default: rateLimit } = require("express-rate-limit");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

// import from the files
const AppError = require("./Utilities/AppError");
const cabinsRouter = require('./Routes/cabinsRoutes');
const guestsRouter = require('./Routes/guestsRoutes');

const app = express();

// see the req results in the terminal
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//--------app security-----------

// limit the requests in a time limit
// const limiter = rateLimit({
//   max: 1000, // maximum of 1000 requests
//   windowMs: 60 * 60 * 1000, // time window : one hour (in milliSeconds)
//   message: "To meany request from this IP. Please try again in an hour", //  The error message sent when a user exceeds the limit
//   headers: true, // send rate limit info in the http header
// });
// app.use("/api", limiter);

// add security headers
// app.use(helmet());

// prevent from bad codes
// app.use(ExpressMongoSanitize());

// prevent bad queries
// app.use(
//   hpp({
//     whitelist: [
//       // the queries that you allow those to be multiple of that on the url
//     ],
//   })
// );

// body parser
// app.use(express.json({ limit: "10kb" }));

// cookie parser
// app.use(cookieParser());

// compression responses
// app.use(compression());

// all the routes here
app.use('/api/v1/cabins' , cabinsRouter);
app.use('/api/v1/guests' , guestsRouter)

// for irrelevant routes
// app.all("*", (req, res, next) => {
//   const error = new AppError(`${req.originalUrl} is not a valid url`);
//   next(error);
// });

// middleware for handle all the errors
// app.use(/* the error handler function */);

module.exports = app ;