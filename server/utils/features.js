import mongoose from "mongoose";
import jwt from "jsonwebtoken";


const connectDB = async(uri) => {
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
  const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

  return res
    .status(code)
    .cookie("cookie-token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite:"none",
      httpOnly:true,
      secure:true
    })
    .json({
      success: true,
      token,
      message,
      user,
    });
};

export { connectDB ,sendToken};
