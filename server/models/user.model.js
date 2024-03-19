import { hash } from "bcrypt";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    bio: { type: String, required: true },
    password: { type: String, required: true, select: false },
    avatar: {
      public_id: { type: String, required: false },
      url: { type: String, required: false },
    },
  },
  { timestamps: true, versionKey: false }
);


userSchema.pre("save", async function (cb) {
  if (!this.isModified("password")) {
    cb();
  }
  this.password = await hash(this.password, 10);
});

export const User = mongoose.models.User || model("User", userSchema);
