import { Router } from "express";
import { isAuthenticated } from "../common/middlewares/jwt.middlewares";
import { isParamsSetted } from "../common/middlewares/query.middlewares";
import { validateBody } from "../common/middlewares/zod.middlewares";
import { taskRequestSchema } from "./schema/task.request.schema";
import { TaskController } from "./tasks.controller";

const taskController = new TaskController();

export default (router: Router) => {
    router.get("/tasks", isAuthenticated, taskController.getTasks);
    router.get("/tasks/:id", isAuthenticated, isParamsSetted, taskController.getTask);

    router.post("/tasks", isAuthenticated, validateBody(taskRequestSchema), taskController.createTask);

    router.put("/tasks/:id", isAuthenticated, isParamsSetted, validateBody(taskRequestSchema), taskController.updateTask);
}