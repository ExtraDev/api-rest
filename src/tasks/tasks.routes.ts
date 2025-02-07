import { Router } from "express";
import { isAuthenticated } from "../common/middlewares/jwt.middleware";
import { isBodySetted, logAction } from "../common/middlewares/query.middleware";
import { TaskController } from "./tasks.controller";

const taskController = new TaskController();

export default (router: Router) => {
    router.get("/tasks", logAction, isAuthenticated, taskController.getTasks);

    router.post("/tasks", logAction, isAuthenticated, isBodySetted, taskController.createTask);
}