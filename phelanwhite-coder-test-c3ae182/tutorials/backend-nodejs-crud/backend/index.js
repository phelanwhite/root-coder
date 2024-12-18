import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { connectMongoDB } from "./configs/connectDB.js";
import taskRouter from "./routers/task.js";
import env from "./configs/env.js";

await connectMongoDB();

const app = express();
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`); // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port
});
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(`/task`, taskRouter);
