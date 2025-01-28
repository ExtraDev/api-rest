import { Router } from "express";
import { isBodySetted, logAction } from "../common/middlewares/query.middleware";
import { TaskController } from "./tasks.controller";

const taskController = new TaskController();

export default (router: Router) => {
    router.get("/tasks", logAction, taskController.getTasks);

    router.post("/tasks", logAction, isBodySetted, taskController.createTask);
}