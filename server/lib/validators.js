import { body, check, param, query, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(",");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Please Enter name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("bio", "Please Enter bio").notEmpty(),
  body("password", "Please Enter password").notEmpty(),
  check("avatar", "please upload avatar").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please Enter valid group name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter members")
    .isArray({ min: 2, max: 100 })
    .withMessage("members must be 2-100"),
];
const addMemberValidator = () => [
  body("chatId", "Please Enter valid chatId").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter members")
    .isArray({ min: 1, max: 97 })
    .withMessage("members must be 2-100"),
];
const removeMemberValidator = () => [
  body("chatId", "Please Enter valid chatId").notEmpty(),
  body("userId", "Please Enter valid userId").notEmpty(),
];
const leaveGroupValidator = () => [
  param("id", "Please provide a valid chatId").notEmpty(),
];
const sendAttachmentValidator = () => [
  body("chatId", "Please Enter valid chatId").notEmpty(),
  check("files")
    .notEmpty()
    .withMessage("please upload attachments")
    .isArray({ min: 1, max: 5 })
    .withMessage("members must be 1-5"),
];

const chatIdValidator = () => [
  param("id", "Please provide a valid chatId").notEmpty(),
];
const renameValidator = () => [
  param("id", "Please provide a valid chatId").notEmpty(),
  body("name", "Please Enter valid new name").notEmpty(),
];
const sendRequestValidator = () => [
  body("userId", "Please Enter valid UserID").notEmpty(),
];
const acceptRequestValidator = () => [
  body("requestId", "Please Enter valid requestId").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please add accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];
const adminLoginValidator = () => [
  body(
    "secretKey",
    "Please Enter valid secretKey to verify your identity."
  ).notEmpty(),
];

export {
  registerValidator,
  validateHandler,
  loginValidator,
  newGroupValidator,
  addMemberValidator,
  removeMemberValidator,
  leaveGroupValidator,
  sendAttachmentValidator,
  chatIdValidator,
  renameValidator,
  sendRequestValidator,
  acceptRequestValidator,
  adminLoginValidator
};
