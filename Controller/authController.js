const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const catchAsync = require("../Utilities/catchAsync");
const User = require("../Model/userModel");
const AppError = require("../Utilities/AppError");

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const sendToken = (user, statusCode, res) => {
  // 1) create token
  const token = createToken(user.id);

  // 2A) create cookie option
  const cookieOption = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // cookie just modify with http method not the client
    httpOnly: true,
  };

  // 2B) if we are in production we should set secure in cookie option to true
  if (process.env.NODE_ENV === "production") cookieOption.secure = true;

  // 2C) send token in cookie
  res.cookie("jwt", token, cookieOption);

  // 3) we don't even show bcrypt pass to use
  user.password = undefined;

  // 4) sed res
  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

// signup
exports.signup = catchAsync(async (req, res, next) => {
  // 1) create user
  const user = await User.create({
    fullName: req.body.fullName,
    role: req.body.role,
    workNumber: req.body.workNumber,
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangeAt: req.body.passwordChangeAt || undefined,
  });
  // 2) send token
  sendToken(user, 201, res);
});

// login
exports.login = catchAsync(async (req, res, next) => {
  // 1) get username and pass from the re.body
  const { username, password } = req.body;

  // 2) check that username and password are exist in this request
  if (!username || !password) {
    return next(new AppError("username and password should include", 404));
  }

  // 3) find user from username
  const user = await User.findOne({ username }).select("+password");

  // 4) check if the user is exist and password is true
  if (!user || (await user.correctPass(user.password, password))) {
    return next(new AppError("username or password is not correct", 401));
  }

  // 5) so we arrive here it means everything is correct so we can send token to the client
  sendToken(user, 200, res);
});

// logout
exports.logout = (req, res) => {
  res.cookie("jwt", "logout", {
    expiresIn: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

// protect route
exports.protect = catchAsync(async (req, res, next) => {
  // 1) check if user logout
  if (res.cookies?.jwt === "logout") {
    return next(new AppError("you're not login please login to access", 401));
  }

  // 2) get token from header or cookie
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (res.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  // 3) error if there is no token
  if (!token) {
    return next(new AppError("You're not log in please log in to access", 401));
  }

  // 4) decoded jwt
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 5) get user from decoded jwt
  const user = await User.findById(decoded.id);

  // 6) error if there is no user with this jwt
  if (!user) {
    return next(
      new AppError("the user belonging to this token is not exist", 401)
    );
  }

  // 7) check if password change after token was issued
  if (user.changedPassword(decoded.iat)) {
    return next(
      new AppError(
        "User recently changed the password! please login again",
        401
      )
    );
  }

  // 8) if everything is OK till here we assign req.user to real user
  req.user = user;

  next();
});

// restrict to
exports.restrictTo =
  (...role) =>
  (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError("you do not have permission to confirm this action", 403)
      );
    }
    next();
  };
