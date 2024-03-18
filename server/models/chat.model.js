import mongoose, { Schema, model,Types } from "mongoose";

const chatSchema = new Schema(
  {
    name: { type: String, required: true },
    groupChat: { type: Boolean, required: false },
    creator: { type: Types.ObjectId, ref: "User" },
    members: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, versionKey: false }
);

export const Chat = mongoose.models.Chat || model("Chat", chatSchema);
