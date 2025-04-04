import { Router } from "express";
import { isAuthenticated } from "../common/middlewares/jwt.middlewares";
import { isBodySetted, isParamsSetted } from "../common/middlewares/query.middlewares";
import { ProjectController } from "./projects.controller";

const projectController = new ProjectController();

export default (router: Router) => {
    router.get("/projects", isAuthenticated, projectController.getProjects);
    router.get("/projects/:id", isAuthenticated, isParamsSetted, projectController.getProject);

    router.post("/projects/", isAuthenticated, isBodySetted, projectController.createProject);

    router.put("/projects/:id", isAuthenticated, isBodySetted, isParamsSetted, projectController.updateProject);

    router.delete("/projects/:id", isAuthenticated, isParamsSetted, projectController.deleteProject);
}