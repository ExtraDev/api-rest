import { Request, Response } from "express";
import * as TaskService from "./tasks.service";

export class TaskController {
    public async getTasks(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await TaskService.getTasks());
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'An error occurred' });
        }
    }
}
