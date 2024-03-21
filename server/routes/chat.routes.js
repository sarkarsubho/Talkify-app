import express from "express";
import { getMyProfile } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachment,
} from "../controllers/chat.controller.js";
import { attachmentMulter } from "../middlewares/multer.js";
import {
  addMemberValidator,
  chatIdValidator,
  leaveGroupValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentValidator,
  validateHandler,
} from "../lib/validators.js";

const router = express.Router();

router.use(isAuth);

router.post("/new", newGroupValidator(), validateHandler, newGroupChat);
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
router.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
router.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);
router.delete("/leave/:id", leaveGroupValidator(), validateHandler, leaveGroup);

// send attachment
router.post(
  "/message",
  attachmentMulter,
  sendAttachmentValidator(),
  validateHandler,
  sendAttachment
);

// get messages
router.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

// getChatDetails ,rename ,delete
router
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default router;
