import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: {
      type: String,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    provider_google: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next, opts) {
  // hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

export default userModel =
  mongoose.models.user || mongoose.model("user", userSchema);
