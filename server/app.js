import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config({
  path: "./.env",
});
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
console.log(mongoURI);
const app = express();

connectDB(mongoURI);
app.use(cors());
app.use(express.json());

// use it if using form data.
// app.use(express.urlencoded());


app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send(
    `<h1 style="color:green; text-align:center">Welcome to Talkify App...</h1>`
  );
});

app.use(errorMiddleware)
app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(`server Error, ${error}`);
  }
});
