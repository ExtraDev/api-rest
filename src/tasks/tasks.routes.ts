import { Router } from "express";
import { isBodySetted } from "../common/middlewares/query.middleware";
import { TaskController } from "./tasks.controller";

const taskController = new TaskController();

export default (router: Router) => {
    router.get("/tasks", taskController.getTasks);

    router.post("/tasks", isBodySetted, taskController.createTask);
}