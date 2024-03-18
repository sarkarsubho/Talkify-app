import express from "express";
import { login, newUser } from "../controllers/user.controller.js";
import { singleAvatar } from "../middlewares/multer.js";

const router =express.Router();

router.get("/",(req,res)=>{
res.send("ddf")
});

router.post("/new",singleAvatar, newUser);

router.post("/login",login);

export default router;
