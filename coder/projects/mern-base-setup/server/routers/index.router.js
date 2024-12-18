import express from "express";
import rootRouter from "./root/index.router.js";
import apiRouter from "./api/index.router.js";
import adminRouter from "./admin/index.router.js";
import { verifyTokenAdmin } from "#server/middlewares/verifyToken.middleware";

const router = express();

router.use("/", rootRouter);
router.use("/", apiRouter);
router.use("/admin", verifyTokenAdmin, adminRouter);

export default router;
