import "express-async-errors";
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

//routers

import jobRouter from "./routes/jobRouter.js";
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//public

//middlewares
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  rmSync.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

//it has to be the lastone!!!
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is running on port ${port}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
