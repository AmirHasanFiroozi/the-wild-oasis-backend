const { default: mongoose } = require("mongoose");

const settingSchema = new mongoose.Schema({
    createAt : {
        type :Date ,
        default : Date.now(),
    },
    type : {
        type : String ,
        default : "setting"
    },
    minBookingNumber : {
        type : Number , 
        default : 5
    },
    maxBookingNumber : {
        type : Number , 
        default : 10
    } ,
    maxGuestsPerBooking : {
        type : Number ,
        default : 2
    },
    breakfastPrice : Number ,
})

const Setting = mongoose.model( 'setting' , settingSchema);

module.exports = Setting ;