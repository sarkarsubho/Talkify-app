import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 10 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = async (uri) => {
  return mongoose
    .connect(uri)
    .then((data) => {
      console.log(`Connected toDB: ${data.connection.host}`);
    })
    .catch((er) => {
      throw er;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("Talkify-token", token, cookieOptions).json({
    success: true,
    token,
    message,
    user,
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("emeting Event...", event);
};

const deleteFilesFromCloudinary = async (public_ids) => {};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
};
