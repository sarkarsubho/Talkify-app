import { compare } from "bcrypt";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/features.js";

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

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username);

    // select password select the password only and select + password = select all the data with added password if not select then only the data without password only work if the only the select property added to the data model

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return next(new Error("Invalid username or password!"));
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) return next(new Error("Invalid username or password!"));

    // response, data, status code, message
    sendToken(res, user, 200, `Welcome Back ${user.name}.`);
   
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res) => {};

export { login, newUser };
