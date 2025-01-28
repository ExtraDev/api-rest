import { Router } from "express";
import { isBodySetted, isParamsSetted } from "../common/middlewares/query.middleware";
import { ProjectController } from "./projects.controller";

const projectController = new ProjectController();

export default (router: Router) => {
    router.get("/projects", projectController.getProjects);
    router.get("/projects/:id", isParamsSetted, projectController.getProject);

    router.post("/projects/", isBodySetted, projectController.createProject);

    router.put("/projects/:id", isBodySetted, isParamsSetted, projectController.updateProject);
}