import { Request, Response } from "express";
import { Task } from "../models/task";
import * as TaskService from "../services/taskService";

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
