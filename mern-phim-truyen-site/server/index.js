import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import path from "path";

import passportConfig from "./configs/passport-config.js";
import ENV_CONFIG from "./configs/env-config.js";
import corsConfig from "./configs/cors-config.js";
import sessionConfig from "./configs/session-config.js";
import { connectMongoDB } from "./configs/database-config.js";

import router from "./routers/index.router.js";
import { handleError } from "./helpers/responses.js";

// connect database
connectMongoDB();

// express app setup
const app = express();
app.use(corsConfig);
app.use(cookieParser());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.listen(ENV_CONFIG.PORT.PORT_SERVER, function () {
  console.log(`Server is running on port ${ENV_CONFIG.PORT.PORT_SERVER}`);
});

// passport
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(`/api/v1`, router);

// deployments
if (process.env.NODE_ENV === "production") {
  const _dirname = path.resolve();
  app.use(express.static(path.join(_dirname, "client", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
  });
}

// error handler
app.use(handleError);
