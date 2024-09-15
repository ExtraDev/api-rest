import { Router } from "express";
import { ProjectController } from "../controllers/projectController";

const projectController = new ProjectController();

export default (router: Router) => {
    router.get("/projects", projectController.getProjects);
    router.get("/projects/:id", projectController.getProject);

    router.post("/projects/", projectController.createProject);
}