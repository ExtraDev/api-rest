import { Router } from "express";
import { isAuthenticated } from "../common/middlewares/jwt.middleware";
import { isBodySetted, isParamsSetted, logAction } from "../common/middlewares/query.middleware";
import { ProjectController } from "./projects.controller";

const projectController = new ProjectController();

export default (router: Router) => {
    router.get("/projects", logAction, isAuthenticated, projectController.getProjects);
    router.get("/projects/:id", logAction, isAuthenticated, isParamsSetted, projectController.getProject);

    router.post("/projects/", logAction, isAuthenticated, isBodySetted, projectController.createProject);

    router.put("/projects/:id", logAction, isAuthenticated, isBodySetted, isParamsSetted, projectController.updateProject);
}