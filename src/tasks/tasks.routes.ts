import { Router } from "express";
import { isAuthenticated } from "../common/middlewares/jwt.middlewares";
import { isBodySetted, isParamsSetted } from "../common/middlewares/query.middlewares";
import { TaskController } from "./tasks.controller";

const taskController = new TaskController();

export default (router: Router) => {
    router.get("/tasks", isAuthenticated, taskController.getTasks);
    router.get("/tasks/:id", isAuthenticated, isParamsSetted, taskController.getTask);

    router.post("/tasks", isAuthenticated, isBodySetted, taskController.createTask);

    router.put("/tasks/:id", isAuthenticated, isParamsSetted, isBodySetted, taskController.updateTask);
}