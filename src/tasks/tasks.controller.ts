import { Request, Response } from "express";
import { Task } from "./tasks.model";
import * as TaskService from "./tasks.service";

export class TaskController {
    public async getTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks: Array<Task> = await TaskService.getTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch tasks" });
        }
    }
}
