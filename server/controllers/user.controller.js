import { compare } from "bcrypt";
import { User } from "../models/user.model.js";
import {
  cookieOptions,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import { tryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.model.js";
import { Request } from "../models/request.model.js";
import { NEW_REQUEST, REFATCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

// create a new user and save the token in cookie
const newUser = tryCatch(async (req, res, next) => {
  const { name, username, bio, password } = req.body;
  const file = req.file;
  // const file = req.body.avatar;

  // console.log("file,", file,req.body);

  if (!file) {
    return next(new ErrorHandler("Please upload Avatar.", 400));
  }

  const result = await uploadFilesToCloudinary([file]);

  let avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };
  let user = await User.create({ name, username, bio, password, avatar });
  sendToken(res, user, 201, "user created successfully!");
});

// log user by username and password

const login = tryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);
  // select password select the password only and select + password = select all the data with added password if not select then only the data without password

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid username or password!", 404));
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch)
    return next(new ErrorHandler("Invalid username or password!", 404));

  // response, data, status code, message
  sendToken(res, user, 200, `Welcome Back ${user.name}.`);
});

const getMyProfile = tryCatch(async (req, res) => {
  let user = await User.findById(req.user);

  res.send({ red: "ok", user });
});

// logout
const logout = tryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("Talkify-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "user Logged out successfully.",
    });
});

// search User
const searchUser = tryCatch(async (req, res, next) => {
  const { name = "" } = req.query;

  // find all my chats
  const myChats = await Chat.find({ groupChat: false, members: req.user });
  // getting all the users from my chats means people i have chat with.
  const allUserFromChats = myChats.map((chat) => chat.members).flat();
  //.filter((id)=>id.toString() !== req.user);

  // finding all users except me and my friends
  // const allUsersExceptMeAndMyFriends = await User.find({
  //   _id: { $nin: allUserFromChats },
  //   name: { $regex: name, $options: "i" },
  // }).lean();

  // let searchedUser = allUsersExceptMeAndMyFriends.map(
  //   ({ _id, name, avatar }) => ({
  //     _id,
  //     name,
  //     avatar: avatar.url,
  //   })
  // );

  const searchedUser = await User.aggregate([
    {
      $match: {
        _id: { $nin: allUserFromChats },
        name: { $regex: name, $options: "i" },
      },
    },
    {
      $project: { _id: 1, name: 1, avatar: "$avatar.url" },
    },
  ]);

  return res.status(200).json({
    success: true,
    searchedUser,
  });
});

const sendFriendRequest = tryCatch(async (req, res, next) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) return next(new ErrorHandler("Request Already sent", 400));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Friend Request sent.",
  });
});

const acceptFriendRequest = tryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) return next(new ErrorHandler("Request not Found", 404));

  if (request.receiver._id.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler("You are not Authorized to accept this request", 401)
    );
  }

  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Friend Request Rejected.",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFATCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Friend Request Accepted.",
    senderId: request.sender._id,
  });
});

const getAllNotifications = tryCatch(async (req, res) => {
  const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequests = requests.map(({ _id, sender }) => {
    return {
      _id,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
    };
  });

  return res.status(200).json({
    success: true,
    allRequests,
  });
});

const getMyFriends = tryCatch(async (req, res) => {
  const chatId = req.query.chatId;

  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");

  const friends = chats.map(({ members }) => {
    const otherUsers = getOtherMember(members, req.user);

    return {
      _id: otherUsers._id,
      name: otherUsers.name,
      avatar: otherUsers.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);

    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );
    return res.status(200).json({
      success: true,
      friends: availableFriends,
    });
  } else {
    return res.status(200).json({
      success: true,
      friends,
    });
  }
});

export {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getAllNotifications,
  getMyFriends,
};
