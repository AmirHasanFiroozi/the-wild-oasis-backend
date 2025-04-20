const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: [true, "fullName is required"],
    trim: true,
    minlength: [2, "your fullName is very short"],
    maxlenght: [50, "your fullName is too long"],
  },
  role: {
    type: String,
    default: "employee",
    enum: {
      values: ["employee", "supervisor", "BUS"],
      message: "this role is not support",
    },
  },
  workNumber: {
    type: String,
    validator: function (val) {
      return val.length === 18 && val.startsWith("45484758485");
    },
    message: (workNumber) => `/${workNumber.value}/ is not a valid workNumber`,
    require: true,
    trim: true,
  },
  username: {
    type: String,
    unique: [
      true,
      "someone use this username before you please choose another one",
    ],
    minlength: [2, "this username is too short please use a long one"],
    maxlength: [50, "this username us too long please try another one"],
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    validate: [
      validator.isStrongPassword,
      "password should include at least 8 character contain lower case and upper case word and number and at least contain one character",
    ],
    trim: true,
  },
  passwordConfirm: {
    type: String,
    validator: function (val) {
      return val === this.val;
    },
    message: "password and password confirm should be same",
    trim : true ,
    require : true ,
  },
  passwordChangeAt : Date ,
});

// bcrypt the password and save in the server(db);
userSchema.pre('save' , async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password , 12);
    this.passwordConfirm = undefined ;
    next();
})
userSchema.pre('save' , function(next){
    if(this.isModified('password') || this.isNew){
        this.passwordChangeAt = Date.now();
        return next()
    }
    next();
})

// method for check the entered pass with real user pass ( for 'login' ) 
userSchema.methods.correctPass = async function(userPassword , enteredPass) {
    return await bcrypt.compare(userPassword , enteredPass);
}

// method for check if the password changed after the fwt issued
// after change the password we send new JWT that issued at is grater than password change at and if this not work this function return false and protect our project from unexpected things
userSchema.methods.changedPassword = function(jwtTime){
    if(this.passwordChangeAt){
        const secPassChange = parseInt(this.passwordChangeAt.getTime() /1000 , 10);
        return jwtTime < secPassChange ;
    }
    // this means password is not changed
    return false ;
}

const User = mongoose.model("users", userSchema);

module.exports = User;
