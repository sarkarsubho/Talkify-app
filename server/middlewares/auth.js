import { adminSecretKey } from "../app.js";
import { ErrorHandler } from "../utils/utility.js";
import { tryCatch } from "./error.js";
import jwt from "jsonwebtoken";

const isAuth = tryCatch(async (req, res, next) => {
  //   console.log(req.cookies["Talkify-token"]);
  const token = req.cookies["Talkify-token"];

  if (!token)
    return next(
      new ErrorHandler(
        "You are not authorized to access this, please login first... ",
        401
      )
    );

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  //   console.log(decodedData);
  req.user = decodedData._id;

  next();
});
const isAdmin = tryCatch(async (req, res, next) => {
  //   console.log(req.cookies["Talkify-token"]);
  const token = req.cookies["talkify-admin-token"];

  if (!token)
    return next(
      new ErrorHandler(
        "You are not authorized, only Admin can access this... ",
        401
      )
    );

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched) return next(new ErrorHandler("Invalid Admin key", 401));

  //   console.log(decodedData);
  // req.admin = secretKey;

  next();
});

export { isAuth, isAdmin };
