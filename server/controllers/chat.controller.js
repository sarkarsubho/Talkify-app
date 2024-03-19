import { Alert, REFATCH_CHATS } from "../constants/events.js";
import { tryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.model.js";
import { emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const newGroupChat = tryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2)
    return next(
      new ErrorHandler("Group Chat must have at least 3 members ", 400)
    );

  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, Alert, allMember, `welcome to ${name} group`);
  emitEvent(req, REFATCH_CHATS, allMember, `welcome to ${name} group`);
});

export { newGroupChat };
