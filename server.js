const mongoose = require("mongoose");
const dotenv = require("dotenv");

// config the config.env file
dotenv.config({ path: "./config.env" });

// import app
const app = require("./app");
const AppError = require("./Utilities/AppError");

// handle uncaughtException error
// uncaughtExceptions = استثنا های گرفته نشده
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception 💥💥💥💥  shutting down");
  console.log(err);
  process.exit(1);
});

// make db
const DB = process.env.DATABASE_CONNECTION_STRING.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// timer for race with connecting to db
const raceTimer = new Promise((_, reject) => {
  setTimeout(() => {
    reject(new AppError("the connection to the server has been too long", 500));
  }, 10000);
});

// connecting to the mongo db with race
Promise.race([
  mongoose
    .connect(DB)
    .then(() => "our project successfully connected to mongoDB"),
  raceTimer,
])
  .then((message) => console.log(message))
  .catch((err) => console.error("error for connecting to DB", err.message));

// listening to the server
const port = process.env.PORT || 5000;
const server = app.listen(
  port,
  console.log("we're listening to the server🧏👂")
);

// handle unhandledRejection error
process.on('unhandledRejection' , (err)=> {
    console.error("Unhandled Rejection 💥💥💥💥 shutting down");
    console.log(err.name , err.message);
    server.close(()=>{
        server.exit(1);
    })
})

