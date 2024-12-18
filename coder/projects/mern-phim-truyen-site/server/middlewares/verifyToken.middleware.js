import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import ENV_CONFIG from "#server/configs/env-config";

export async function verifyToken(req, res, next) {
  try {
    const access_token = req.cookies.access_token;
    if (!access_token) {
      throw createHttpError.Forbidden("Invalid token");
    }
    jwt.verify(access_token, ENV_CONFIG.JWT.JWT_SECRET, (error, decode) => {
      if (error) {
        throw createHttpError.Forbidden(error.message);
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyTokenAdmin(req, res, next) {
  try {
    const access_token = req.cookies.access_token;
    if (!access_token) {
      throw createHttpError.Forbidden("Invalid token");
    }
    jwt.verify(access_token, ENV_CONFIG.JWT.JWT_SECRET, (error, decode) => {
      if (error) {
        throw createHttpError.Forbidden(error.message);
      }
      if (decode.role !== "admin") {
        throw createHttpError.Forbidden("Unauthorized access");
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
}
