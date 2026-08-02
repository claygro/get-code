import { Router } from "express";
import SnipptsControllers from "../controllers/snippts.controllers.js";
import UserMiddleware from "../middlewares/user.middleware.js";
const snipptsRoutes = Router();
const snipptsControllers = new SnipptsControllers();
//upload snippits
snipptsRoutes.post("/upload", UserMiddleware, snipptsControllers.upload);
// read snippits
snipptsRoutes.get("/read", UserMiddleware, snipptsControllers.read);
export default snipptsRoutes;
