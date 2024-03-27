import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64 } from "../lib/helper.js";

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

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        { resource_type: "auto", public_id: uuid() },
        function (error, result) {
          if (error) return reject(error);
          resolve(result);
          console.log(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => {
      return {
        public_id: result.public_id,
        url: result.secure_url,
      };
    });

    return formattedResults;
  } catch (error) {
    throw new Error("Error uploading files to cloudnary", error);
  }
};
const deleteFilesFromCloudinary = async (public_ids) => {};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
};
