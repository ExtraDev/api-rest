import { Router } from "express";
import { TaskController } from "../controllers/taskController";

const taskController = new TaskController();

export default (router: Router) => {
    router.get("/tasks", taskController.getTasks);
}