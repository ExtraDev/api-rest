import { Router } from "express";
import { isBodySetted, isParamsSetted, logAction } from "../common/middlewares/query.middleware";
import { ProjectController } from "./projects.controller";

const projectController = new ProjectController();

export default (router: Router) => {
    router.get("/projects", logAction, projectController.getProjects);
    router.get("/projects/:id", logAction, isParamsSetted, projectController.getProject);

    router.post("/projects/", logAction, isBodySetted, projectController.createProject);

    router.put("/projects/:id", logAction, isBodySetted, isParamsSetted, projectController.updateProject);
}