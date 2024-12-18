import session from "express-session";
import ENV_CONFIG from "./env-config.js";

const sessionConfig = session({
  secret: ENV_CONFIG.PASSPORT.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});

export default sessionConfig;
