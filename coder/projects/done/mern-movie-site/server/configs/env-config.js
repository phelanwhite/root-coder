import dotenv from "dotenv";
dotenv.config();

const env = {
  // CLOUDINARY
  CLOUDINARY: {
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_FOLDER_NAME: process.env.CLOUDINARY_FOLDER_NAME,
  },

  // MONGODB
  MONGODB: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DBNAME: process.env.MONGODB_DBNAME,
  },

  // JWT
  JWT: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  },

  // PASSPORT
  PASSPORT: {
    PASSPORT_REDIRECT_SUCCESS: process.env.PASSPORT_REDIRECT_SUCCESS,
    PASSPORT_REDIRECT_FAILED: process.env.PASSPORT_REDIRECT_FAILED,
    SESSION_SECRET: process.env.SESSION_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  },

  // EMAIL
  EMAIL: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },

  // PORT
  PORT: {
    PORT_SERVER: process.env.PORT_SERVER,
    PORT_CLIENT_DEV: process.env.PORT_CLIENT_DEV,
    PORT_CLIENT_PRODUCTION: process.env.PORT_CLIENT_PRODUCTION,
  },

  // NODE_ENV
  NODE_ENV: process.env.NODE_ENV,
  TMDB_TOKEN: process.env.TMDB_TOKEN,
};

export default env;
