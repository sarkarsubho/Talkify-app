import express from "express";
import {
  adminLogin,
  adminLogout,
  allChats,
  allMessages,
  allUsers,
  getAdminData,
  getDashboardStats,
} from "../controllers/admin.controller.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { isAdmin } from "../middlewares/auth.js";

const routes = express.Router();

// public Routes
routes.post("/verify", adminLoginValidator(), validateHandler, adminLogin);
routes.get("/logout", adminLogout);

// only admin can access
routes.use(isAdmin);
routes.get("/",getAdminData);
routes.get("/users", allUsers);
// in frontend uses as groups
routes.get("/chats", allChats);
routes.get("/messages", allMessages);
routes.get("/stats", getDashboardStats);

export default routes;
