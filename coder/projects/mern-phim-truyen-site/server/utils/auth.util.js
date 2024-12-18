import Joi from "joi";
import jwt from "jsonwebtoken";
import ENV_CONFIG from "#server/configs/env-config";
import userModel from "#server/models/user.model";

export const auth_utils = {
  schemaSignup: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  }),
  schemaSignin: Joi.object({
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required(),
  }),
  schemaChangePassword: Joi.object({
    new_password: Joi.string().required(),
    confirm_new_password: Joi.string()
      .valid(Joi.ref("new_password"))
      .required(),
  }),
  schemaForgotPassword: Joi.object({
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
  }),
  schemaResetPassword: Joi.object({
    new_password: Joi.string().required(),
    confirm_new_password: Joi.string()
      .valid(Joi.ref("new_password"))
      .required(),
  }),

  generateTokenJWT: async function (payload) {
    const access_token = await jwt.sign(
      { ...payload },
      ENV_CONFIG.JWT.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    const refresh_token = await jwt.sign(
      { ...payload },
      ENV_CONFIG.JWT.JWT_REFRESH_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 2,
      }
    );
    return {
      access_token,
      refresh_token,
    };
  },
  saveTokenJWTToCookie: async function (
    res,
    { id, access_token, refresh_token }
  ) {
    res.cookie(`access_token`, access_token, {
      httpOnly: true,
      // secure:true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 1,
    });
    res.cookie(`refresh_token`, refresh_token, {
      httpOnly: true,
      // secure:true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 2,
    });
    await userModel.findByIdAndUpdate(
      id,
      {
        refreshToken: refresh_token,
      },
      {
        new: true,
      }
    );
  },
};
