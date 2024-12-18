import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import { PROVIDER_TYPE, USER_ROLE } from "#server/helpers/constants";

const userSchema = new Schema(
  {
    // auth
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.USER,
      required: true,
    },
    provider: [
      {
        provider_type: {
          type: String,
          enum: Object.values(PROVIDER_TYPE),
        },
        provider_id: {
          type: String,
        },
      },
    ],
    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: String,
    },

    // file
    avatar: {
      type: String,
    },
    banner: {
      type: String,
    },

    // basic
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    address: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    email_address: {
      type: String,
    },
    bio: {
      type: String,
    },

    // social media
    link_website: {
      type: String,
    },
    link_instagram: {
      type: String,
    },
    link_facebook: {
      type: String,
    },
    link_twitter: {
      type: String,
    },
    link_linkedin: {
      type: String,
    },
    link_pinterest: {
      type: String,
    },
    link_youtube: {
      type: String,
    },
    link_github: {
      type: String,
    },

    // work and education
    work: {
      type: String,
    },
    education: {
      type: String,
    },
    skills: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
