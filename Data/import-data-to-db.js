const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const fs = require("fs");
const Cabin = require("../Model/cabinsModel");
const Guest = require("../Model/guestsModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_CONNECTION_STRING.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("connected to database successfully"))
  .catch((err) =>
    console.log("there is an error for connecting to database", err)
  );

const cabins = JSON.parse(fs.readFileSync(`${__dirname}/data-cabins.json`));
const guests = JSON.parse(fs.readFileSync(`${__dirname}/data-guests.json`));

const UploadFiles = async () => {
  try {
    await Cabin.create(cabins);
    await Guest.create(guests);
    console.log("data loaded to the database successfully");
  } catch (err) {
    console.log("there is an error for load data to the server", err);
  } finally {
    process.exit();
  }
};

const deleteFiles = async () => {
  try {
    await Cabin.deleteMany();
    await Guest.deleteMany();
    console.log("data deleted from the database successfully");
  } catch (err) {
    console.log("there is an error for delete data from database", err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === "--import") UploadFiles();
else if (process.argv[2] === "--delete") deleteFiles();
else console.log("unknown error");
