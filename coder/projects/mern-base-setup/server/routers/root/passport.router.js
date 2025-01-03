import { StatusCodes } from "http-status-codes";
import express from "express";
import passport from "passport";
import createHttpError from "http-errors";
import ENV_CONFIG from "#server/configs/env-config";
import userModel from "#server/models/user.model";
import { handleResponse } from "#server/helpers/responses";
import { auth_utils } from "#server/utils/auth.util";

const passportRouter = express.Router();

// google
passportRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
passportRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: ENV_CONFIG.PASSPORT.PASSPORT_REDIRECT_SUCCESS,
    failureRedirect: ENV_CONFIG.PASSPORT.PASSPORT_REDIRECT_FAILED,
  })
);

// response
passportRouter.get("/signin-passport/success", async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw createHttpError.Unauthorized(`Authentication failed`);
    }

    const userExists = await userModel.findOne({
      email: user.email,
    });

    // save token in cookie
    const token = await auth_utils.generateTokenJWT({
      _id: userExists._id,
      role: userExists.role,
    });
    await auth_utils.saveTokenJWTToCookie(res, {
      id: userExists._id,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User signed in successfully",
      data: {
        user: userExists,
        access_token: token.access_token,
      },
    });
  } catch (error) {
    next(error);
  }
});

passportRouter.get("/signin-passport/failed", async (req, res, next) => {
  try {
    return handleResponse(res, {
      status: StatusCodes.UNAUTHORIZED,
      message: "Authentication failed",
    });
  } catch (error) {
    next(error);
  }
});

export default passportRouter;
