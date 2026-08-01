import { Router } from "express";
import ProfileControllers from "../controllers/profile.controllers.js";
import UserMiddleware from "../middlewares/user.middleware.js";
const profileRoutes = Router();
const profileControllers = new ProfileControllers();
profileRoutes.get("/getProfile", UserMiddleware, profileControllers.getProfile);
profileRoutes.put(
  "/updateProfile",
  UserMiddleware,
  profileControllers.updateProfile,
);
export default profileRoutes;
