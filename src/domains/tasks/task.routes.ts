import { Request, Response, Router } from "express";
import { TaskController } from "./task.controller";

const taskController = new TaskController();

export default (router: Router) => {
    router.get("/tasks", (req: Request, res: Response) => taskController.getTasks(req, res));

    router.post("/tasks", (req: Request, res: Response) => taskController.createTask(req, res));

    router.put("/tasks/:id", (req: Request, res: Response) => taskController.updateTask(req, res));
}