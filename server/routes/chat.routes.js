import express from "express";
import { getMyProfile } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachment,
} from "../controllers/chat.controller.js";
import { attachmentMulter } from "../middlewares/multer.js";

const router = express.Router();

router.use(isAuth);

router.post("/new", newGroupChat);
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
router.put("/addmembers", addMembers);
router.put("/removemember", removeMember);
router.delete("/leave/:id", leaveGroup);

// send attachment
router.post("/message", attachmentMulter, sendAttachment);

// get messages


// getChatDetails ,rename ,delete
router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default router;
