
import AuthControllers from "../controllers/auth.controllers.js";
import { Router } from "express";
const authRoutes = Router();
const authControllers = new AuthControllers();
authRoutes.post("/signup", authControllers.signup);
authRoutes.post("/login", authControllers.login);
export default authRoutes


        