import { Router } from "express";
import projectRoutes from "./projectRoutes";
import taskRoutes from "./taskRoutes";

const router = Router();

export default (): Router => {
    projectRoutes(router);
    taskRoutes(router);
    return router;
}