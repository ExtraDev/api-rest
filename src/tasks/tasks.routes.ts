import { Router } from "express";
import { TaskController } from "./tasks.controller";

const taskController = new TaskController();

export default (router: Router) => {
    router.get("/tasks", taskController.getTasks);
}