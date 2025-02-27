import { Router } from "express";
import { isBodySetted, isParamsSetted } from "../common/middlewares/query.middlewares";
import { TaskController } from "./tasks.controller";

const taskController = new TaskController();

export default (router: Router) => {
    router.get("/tasks", taskController.getTasks);
    router.get("/tasks/:id", isParamsSetted, taskController.getTask);

    router.post("/tasks", isBodySetted, taskController.createTask);

    router.put("/tasks/:id", isParamsSetted, isBodySetted, taskController.updateTask);
}