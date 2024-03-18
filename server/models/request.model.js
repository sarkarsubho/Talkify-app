import mongoose, { Schema, model,Types } from "mongoose";

const requestSchema = new Schema(
  {
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accept", "rejected"],
    },
    sender: { type: Types.ObjectId, ref: "User", required: true },
    receiver: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Request = mongoose.models.Request || model("Request", requestSchema);
