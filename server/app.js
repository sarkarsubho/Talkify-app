import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import chatRoute from "./routes/chat.routes.js";
import adminRoute from "./routes/admin.routes.js";

import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createGroupChat, createMessage, createMessageInAChat, createSingleChat } from "./seedres/chat.js";
import { createUser } from "./seedres/user.js";

dotenv.config({
  path: "./.env",
});
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "123abc96558";
console.log(mongoURI);
const app = express();

connectDB(mongoURI);

// creating fake user for test
// createUser(10);
// createSingleChat(10)
// createGroupChat(10)

// createMessage()
// createMessageInAChat("65fc65f991b710bda8f559e1",50);


app.use(cors());
app.use(express.json());
app.use(cookieParser());

// use it if using form data.
// app.use(express.urlencoded());

// main routes
app.use("/user", userRoute);
app.use("/chat", chatRoute);

// admin routes
app.use("/admin", adminRoute);

// default route / home route
app.get("/", (req, res) => {
  res.send(
    `<h1 style="color:green; text-align:center">Welcome to Talkify App...</h1>`
  );
});

app.use(errorMiddleware);
app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV}`);
  } catch (error) {
    console.log(`server Error, ${error}`);
  }
});
