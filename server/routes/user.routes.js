import express from "express";
import {
  acceptFriendRequest,
  getAllNotifications,
  getMyFriends,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.controller.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuth } from "../middlewares/auth.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validators.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("ddf");
});

router.post(
  "/new",
  singleAvatar,
  registerValidator(),
  validateHandler,
  newUser
);

router.post("/login", loginValidator(), validateHandler, login);

// after this user must be logged in to use this routes
router.use(isAuth);

router.get("/me", getMyProfile);

router.get("/logout", logout);
router.get("/search", searchUser);

// send friend Request
router.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);

router.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);
router.get(
  "/notifications",
  getAllNotifications
);
router.get(
  "/friends",
  getMyFriends
);

export default router;
