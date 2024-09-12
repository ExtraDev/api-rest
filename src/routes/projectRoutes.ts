import { Router } from "express";
import { ProjectController } from "../controllers/projectController";

const router = Router();
const projectController = new ProjectController();

router.get("/projects", projectController.getProjects);
router.get("/projects/:id", projectController.getProject);

export default router;