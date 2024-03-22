import express from "express";
import { allChats, allMessages, allUsers } from "../controllers/admin.controller.js";

const routes = express.Router();

routes.get("/");
routes.get("/verify");
routes.get("/logout");
routes.get("/users", allUsers);
routes.get("/chats",allChats);
routes.get("/messages",allMessages);
routes.get("/stats");

export default routes;
