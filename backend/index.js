import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import authRoutes from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Backend Running");
});
app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);
    console.log("Server is started");
  } catch (error) {
    console.log("Error in starting the server: ", error);
  }
});
