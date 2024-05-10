import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import chatRoute from "./routes/chat.routes.js";
import adminRoute from "./routes/admin.routes.js";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import {
  createGroupChat,
  createMessage,
  createMessageInAChat,
  createSingleChat,
} from "./seedres/chat.js";
import { createUser } from "./seedres/user.js";

// socket io
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import {
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE_ALERT,
  NEW_Message,
  ONLINE_USERS,
  START_TYPING,
  STOP_TYPING,
} from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.model.js";
import { corsOption } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "123abc96558";

const userSocketIds = new Map();
const onlineUsers = new Set();

// console.log(mongoURI);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOption,
});

app.set("io", io);

connectDB(mongoURI);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// creating fake user for test
// createUser(10);
// createSingleChat(10)
// createGroupChat(10)

// createMessage()
// createMessageInAChat("65fc65f991b710bda8f559e1",50);

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

// use it if using form data.
// app.use(express.urlencoded());

// main routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
// admin routes
app.use("/api/v1/admin", adminRoute);

// default route / home route
app.get("/api/v1/", (req, res) => {
  res.send(
    `<h1 style="color:green; text-align:center">Welcome to Talkify App api v1...</h1>`
  );
});

app.get("/", (req, res) => {
  res.send(
    `<h1 style="color:green; text-align:center">Welcome to Talkify App...</h1>`
  );
});

//  socket authentication middleware
io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});

// socket started here
io.on("connection", (socket) => {
  // console.log("connected socket server with", socket.id);
  const user = socket.user;
  //  console.log((user));
  userSocketIds.set(user._id.toString(), socket.id);

  // console.log(userSocketIds);

  socket.on(NEW_Message, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    // console.log("Emiting Messsage for real time", members);

    const messageForDb = {
      content: message,
      sender: user._id,
      chat: chatId,
    };
    const membersSockets = getSockets(members);
    io.to(membersSockets).emit(NEW_Message, {
      chatId,
      message: messageForRealTime,
    });
    // console.log("new message", messageForRealTime);
    io.to(membersSockets).emit(NEW_MESSAGE_ALERT, { chatId });
    try {
      await Message.create(messageForDb);
    } catch (error) {
      // console.log(error);
      throw new Error(error);
    }
  });

  socket.on(START_TYPING, ({ members, chatId }) => {
    // console.log("Typing...", chatId);

    const membersSockets = getSockets(members);
    socket.to(membersSockets).emit(START_TYPING, { chatId });
  });

  socket.on(STOP_TYPING, ({ members, chatId }) => {
    // console.log("StopTyping...", chatId);

    const membersSockets = getSockets(members);
    socket.to(membersSockets).emit(STOP_TYPING, { chatId });
  });

  socket.on(CHAT_JOINED, ({ userId, members }) => {
    onlineUsers.add(userId.toString());

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
  });

  socket.on(CHAT_LEAVED, ({ userId, members }) => {
    onlineUsers.delete(userId.toString());

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected");
    userSocketIds.delete(user._id.toString());
    onlineUsers.delete(user._id.toString());
    socket.broadcast.emit(ONLINE_USERS, Array.from(onlineUsers));
  });
});

app.use(errorMiddleware);
server.listen(port, () => {
  try {
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV}`);
  } catch (error) {
    console.log(`server Error, ${error}`);
  }
});

export { userSocketIds, adminSecretKey };
