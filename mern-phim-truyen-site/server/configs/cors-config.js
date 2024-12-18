import cors from "cors";
import ENV_CONFIG from "./env-config.js";

const corsConfig = cors({
  credentials: true,
  origin: [ENV_CONFIG.URL.URL_CLIENT],
});

export default corsConfig;
