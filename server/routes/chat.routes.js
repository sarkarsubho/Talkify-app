import express from "express";
import {
  getMyProfile
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/auth.js";
import { newGroupChat } from "../controllers/chat.controller.js";

const router = express.Router();

router.use(isAuth);

router.post("/new", newGroupChat);

export default router;
