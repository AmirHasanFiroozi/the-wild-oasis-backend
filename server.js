const mongoose = require('mongoose');
const dotenv = require('dotenv');

// config the config.env file
dotenv.config({path : './config.env'});

// import app
const app = require('./app');
const AppError = require('./Utilities/AppError');

// handle uncaughtException error
// uncaughtExceptions = استثنا های گرفته نشده
process.on('uncaughtException' , (err) => {
    console.log('Uncaught Exception 💥💥💥💥  shutting down');
    console.log(err);
    process.exit(1);
})

