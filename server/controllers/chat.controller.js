import {
  Alert,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFATCH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { tryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";
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

  emitEvent(req, Alert, allMembers, `welcome to ${name} group`);
  emitEvent(req, REFATCH_CHATS, members, `welcome to ${name} group`);

  return res.status(201).json({
    success: true,
    message: "Group chat Created.",
  });
});

const getMyChats = tryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name username avatar"
  );

  // instead of transform can use aggregation.

  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMember(members, req.user);

    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      name: groupChat ? name : otherMember.name,
      members: members.reduce((a, c) => {
        if (c._id.toString() !== req.user.toString()) {
          a.push(c._id);
        }
        return a;
      }, []),
    };
  });

  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const getMyGroups = tryCatch(async (req, res, next) => {
  // can use aggrigate method
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name username avatar");

  const groups = chats.map(({ _id, name, members, groupChat }) => {
    return {
      _id,
      groupChat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    };
  });

  return res.status(200).json({ success: true, groups });
});

const addMembers = tryCatch(async (req, res, next) => {
  // can use aggrigate method

  const { chatId, members } = req.body;

  if (!members || members.length < 1) {
    return next(new ErrorHandler("Please provide members.", 400));
  }

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not Found !", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group Chat !", 400));
  if (chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler(
        "You are not allowed to add Members in this group !",
        403
      )
    );

  const allNewMembersPromise = members.map((i) => {
    return User.findById(i);
  });

  let allMembers = await Promise.all(allNewMembersPromise);

  const allUniqueMembers = allMembers
    .filter((e) => !chat.members.includes(e._id.toString()))
    .map((e) => e._id);

  chat.members.push(...allUniqueMembers);

  if (chat.members.length > 100) {
    new ErrorHandler("Cannot add more than 100 members !", 400);
  }

  await chat.save();
  const allUsersName = allMembers.map((i) => i.name).join(",");

  emitEvent(
    req,
    Alert,
    chat.members,
    `${allUsersName} has been added to this group.`
  );

  emitEvent(req, REFATCH_CHATS, chat.members);

  return res
    .status(200)
    .json({ success: true, message: "Members added successfully." });
});

const removeMember = tryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;

  if (!userId) {
    return next(new ErrorHandler("Please provide members.", 400));
  }

  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not Found !", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group Chat !", 400));
  if (chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler(
        "You are not allowed to add Members in this group !",
        403
      )
    );

  if (chat.members.length <= 3) {
    return next(new ErrorHandler("Group must have at least 3 members !", 400));
  }

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();
  emitEvent(
    req,
    Alert,
    chat.members,
    `${userThatWillBeRemoved.name} has been removed from the group.`
  );

  emitEvent(req, REFATCH_CHATS, chat.members);

  return res
    .status(200)
    .json({ success: true, message: "Members removed successfully." });
});

const leaveGroup = tryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not Found !", 404));
  // console.log(chat);
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group Chat !", 400));

  const remainingMembers = chat.members.filter((member) => {
    return member.toString() !== req.user.toString();
  });

  if (remainingMembers.length < 3) {
    return next(new ErrorHandler("Group must have at least 3 members !", 400));
  }
  // if creator leave the group then only add a random creator

  if (chat.creator.toString() === req.user.toString()) {
    const randomElement = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[randomElement];
    chat.creator = newCreator;
  }

  chat.members = remainingMembers;

  const [user] = await Promise.all([
    User.findById(req.user, "name"),
    chat.save(),
  ]);

  emitEvent(req, Alert, chat.members, `${user.name} has left the group.`);

  return res
    .status(200)
    .json({ success: true, message: "Members removed successfully." });
});

const sendAttachment = tryCatch(async (req, res, next) => {
  const { chatId } = req.body;
  const files = req.files || [];
 

  const [chat, user] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name avatar"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not Found !", 404));

  if (files.length < 1)
    return next(new ErrorHandler("Please provide an attachment !", 400));
  if (files.length >5)
    return next(new ErrorHandler("Files can't be more than 5 !", 400));
  // console.log(chat);

  //  upload file here
  const attachments = [];

  const messageForDB = {
    content: "",
    attachments,
    sender: user._id,
    chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
    },
  };
  const message = await Message.create(messageForDB);

  emitEvent(req, NEW_ATTACHMENT, chat.members, {
    message: messageForRealTime,
    chatId,
  });
  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
    chatId,
  });

  return res.status(200).json({
    success: true,
    message,
  });
});

const getChatDetails = tryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();

    if (!chat) return next(new ErrorHandler("Chat not Found !", 404));

    chat.members = chat.members.map(({ _id, name, avatar }) => {
      return {
        _id,
        name,
        avatar: avatar.url,
      };
    });

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);

    if (!chat) return next(new ErrorHandler("Chat not Found !", 404));
    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

const renameGroup = tryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { name } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not Found !", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group Chat !", 400));
  if (chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler(
        "You are not allowed to add Members in this group !",
        403
      )
    );

  chat.name = name;

  await chat.save();

  emitEvent(req, REFATCH_CHATS, chat.members);

  return res
    .status(200)
    .json({ success: true, message: "Updated group Name successfully." });
});

const deleteChat = tryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not Found !", 404));

  const members = chat.members;

  if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler("You are not allowed to delete the group !", 403)
    );
  }
  if (!chat.groupChat && !chat.members.includes(req.user.toString())) {
    return next(
      new ErrorHandler("You are not allowed to delete the chat !", 403)
    );
  }

  // here we have to delete all messages as well as attachments or files from cloudinary

  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  messagesWithAttachments.forEach(({ attachments }) => {
    attachments.forEach(({ public_id }) => public_ids.push(public_id));
  });

  await Promise.all([
    // delete files from cloudinary
    deleteFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ]);

  // await chat.save();

  emitEvent(req, REFATCH_CHATS, chat.members);

  return res
    .status(200)
    .json({ success: true, message: "Chat deleted successfully." });
});

const getMessages = tryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const { page = 1 } = req.query;
  const limit = 20;
  const skip = (page - 1) * limit;

  const [messages, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "name avatar")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  const totalPages = Math.ceil(totalMessagesCount / limit) || 0;

  // emitEvent(req, REFATCH_CHATS, chat.members);

  return res
    .status(200)
    .json({ success: true, messages: messages.reverse(), totalPages });
});

export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachment,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
};
