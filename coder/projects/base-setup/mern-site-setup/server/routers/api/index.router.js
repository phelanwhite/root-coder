import express from "express";
import authRouter from "./auth.router.js";
import uploadRouter from "./upload.router.js";
import passportRouter from "./passport.router.js";

const rootRouter = express();

rootRouter.use("/upload", uploadRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/passport", passportRouter);

export default rootRouter;
