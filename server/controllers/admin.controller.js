import { tryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../utils/features.js";
import { adminSecretKey } from "../app.js";

const adminLogin = tryCatch(async (req, res, next) => {
  const { secretKey } = req.body;

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched) return next(new ErrorHandler("Invalid Admin key", 401));

  const token = jwt.sign(secretKey, process.env.JWT_SECRET);

  return res
    .status(200)
    .cookie("talkify-admin-token", token, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({
      success: true,
      message: "Welcome Boss, Identity verified",
    });
});
const adminLogout = tryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("talkify-admin-token", "", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Loggedout Successfully.",
    });
});

const getAdminData = tryCatch(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    admin: true,
    message: "Wlcome Admin",
  });
});

const allUsers = tryCatch(async (req, res, next) => {
  const users = await User.find({});

  const transformUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);

      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        groups,
        friends,
      };
    })
  );

  return res.status(200).json({
    status: "success",
    users: transformUsers,
  });
});
const allChats = tryCatch(async (req, res, next) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name, avatar");

  // can use aggrigation pipeline

  const transformedChats = await Promise.all(
    chats.map(async ({ members, _id, groupChat, name, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });
      //  console.log("chatId," , _id)
      return {
        _id,
        groupChat,
        name,
        avatar: members.map((e) => e.avatar.url),
        members: members.map(({ name, _id, avatar }) => {
          return { _id, name, avatar: avatar.url };
        }),
        creator: {
          name: creator?.name || "None",
          avatar: creator?.avatar.url || "",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  return res.status(200).json({
    status: "success",
    groups: transformedChats,
  });
});

const allMessages = tryCatch(async (req, res, next) => {
  const messages = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");

  const transformedMessages = messages.map(
    ({ content, attachments, _id, sender, createdAt, chat }) => {
      return {
        _id,
        attachments,
        content,
        createdAt,
        chat: chat._id,
        groupChat: chat.groupChat,
        sender: {
          _id: sender._id,
          name: sender.name,
          avatar: sender.avatar.url,
        },
      };
    }
  );

  return res.status(200).json({
    success: true,
    messages: transformedMessages,
  });
});

const getDashboardStats = tryCatch(async (req, res, next) => {
  const [groupsCount, usersCount, messagesCount, totalChatsCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
    ]);

  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const last7DaysMessages = await Message.find({
    createdAt: {
      $gte: last7Days,
      $lte: today,
    },
  }).select("createdAt");

  const messages = new Array(7).fill(0);
  const dayInMs = 1000 * 60 * 60 * 24;
  last7DaysMessages.forEach((message) => {
    const approxIndex =
      (today.getTime() - message.createdAt.getTime()) / dayInMs;

    const index = Math.floor(approxIndex);
    messages[6 - index]++;
  });

  const stats = {
    groupsCount,
    usersCount,
    messagesCount,
    totalChatsCount,
    messagesChart: messages,
  };
  return res.status(200).json({
    success: true,
    stats,
  });
});

export {
  allUsers,
  allChats,
  allMessages,
  getDashboardStats,
  adminLogin,
  adminLogout,
  getAdminData,
};
