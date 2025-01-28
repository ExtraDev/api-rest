import { Request, Response } from "express";
import { extractTaskFromBody } from "./tasks.helper";
import * as TaskService from "./tasks.service";

export class TaskController {
    public async getTasks(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await TaskService.getTasks());
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'An error occurred' });
        }
    }

    public async createTask(req: Request, res: Response): Promise<void> {
        try {
            const newTask = extractTaskFromBody(req);

            const task = await TaskService.createTask(newTask);

            if (!task) {
                res.status(500).json({ error: 'Failed to create task' });
                return;
            }

            res.status(200).json(task);
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'An error occurred' });
        }
    }
}
