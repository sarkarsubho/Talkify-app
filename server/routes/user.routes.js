import express from "express";
import {
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
} from "../controllers/user.controller.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuth } from "../middlewares/auth.js";
import { registerValidator, validateHandler } from "../lib/validators.js";

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

router.post("/login", login);

// after this user must be logged in to use this routes
router.use(isAuth);

router.get("/me", getMyProfile);

router.get("/logout", logout);
router.get("/search", searchUser);

export default router;
