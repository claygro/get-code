import { Router } from "express";
import SnippetsControllers from "../controllers/snippets.controllers.js";
import UserMiddleware from "../middlewares/user.middleware.js";
const snippetsRoutes = Router();
const snippetsControllers = new SnippetsControllers();
//upload snippets
snippetsRoutes.post("/upload", UserMiddleware, snippetsControllers.upload);
// read snippets
snippetsRoutes.get("/read", UserMiddleware, snippetsControllers.read);
//search snippets
snippetsRoutes.post("/search", snippetsControllers.search);
export default snippetsRoutes;
