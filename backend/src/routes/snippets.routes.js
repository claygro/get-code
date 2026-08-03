import { Router } from "express";
import SnippetsControllers from "../controllers/snippets.controllers.js";
import UserMiddleware from "../middlewares/user.middleware.js";
const snippetsRoutes = Router();
const snippetsControllers = new SnippetsControllers();
//upload snippits
snippetsRoutes.post("/upload", UserMiddleware, snippetsControllers.upload);
// read snippits
snippetsRoutes.get("/read", UserMiddleware, snippetsControllers.read);
//specific snippits preview

export default snippetsRoutes;
