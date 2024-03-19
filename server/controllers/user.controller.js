import { compare } from "bcrypt";
import { User } from "../models/user.model.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { tryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

// create a new user and save the token in cookie
const newUser = async (req, res) => {
  const { name, username, bio, password, avatar } = req.body;

  // let avatar = {
  //   public_id: "dfdfdf",
  //   url: "kj",
  // };

  let user = await User.create({ name, username, bio, password, avatar });
  sendToken(res, user, 201, "user created successfully!");
};

// log user by username and password

const login = tryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);
  // select password select the password only and select + password = select all the data with added password if not select then only the data without password only work if the only the select property added to the data model

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid username or password!", 404));
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch)
    return next(new ErrorHandler("Invalid username or password!", 404));

  // response, data, status code, message
  sendToken(res, user, 200, `Welcome Back ${user.name}.`);
});

const getMyProfile = tryCatch(async (req, res) => {
  let user = await User.findById(req.user);

  res.send({ red: "ok", user });
});

// logout
const logout = tryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("Talkify-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "user Logged out successfully.",
    });
});
// search User
const searchUser = tryCatch(async (req, res) => {

  const {name} =req.query;



  let searchedUser=[]



  return res
    .status(200)
    .json({
      success: true,
     name
    });
});

export { login, newUser, getMyProfile, logout ,searchUser};
