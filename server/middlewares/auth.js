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

export { isAuth };
