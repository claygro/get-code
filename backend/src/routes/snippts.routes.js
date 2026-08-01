import { Router } from "express";
import SnipptsControllers from "../controllers/snippts.controllers.js";
import UserMiddleware from "../middlewares/user.middleware.js";
const snipptsRoutes = Router();
const snipptsControllers = new SnipptsControllers();

snipptsRoutes.post("/upload", UserMiddleware, snipptsControllers.upload);
export default snipptsRoutes;
