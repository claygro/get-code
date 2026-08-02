import AuthControllers from "../controllers/auth.controllers.js";
import upload from "../middlewares/upload.middlewares.js";
import { Router } from "express";
const authRoutes = Router();
const authControllers = new AuthControllers();
authRoutes.post("/signup", upload.single("avatar"), authControllers.signup);
authRoutes.post("/login", authControllers.login);
export default authRoutes;
