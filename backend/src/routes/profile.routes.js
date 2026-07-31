import { Router } from "express";
import ProfileControllers from "../controllers/profile.controllers.js";
const profileRoutes = Router();
const profileControllers = new ProfileControllers();
profileRoutes.get("/getProfile", profileControllers.profile);
export default profileRoutes;
