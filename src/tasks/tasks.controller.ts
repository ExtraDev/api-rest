import { Request, Response } from "express";
import { CodeError } from "../common/errors/messages.errors";
import { extractTaskFromBody } from "./tasks.helper";
import * as TaskService from "./tasks.service";

export class TaskController {
    public async getTasks(req: Request, res: Response): Promise<void> {
        try {
            res.status(CodeError.OK).json(await TaskService.getTasks());
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }

    public async getTask(req: Request, res: Response): Promise<void> {
        try {
            const taskId = parseInt(req.params.id);

            if (!taskId) {
                res.status(CodeError.BAD_REQUEST).json({ message: 'Miss task id!' });
                return;
            }

            res.status(CodeError.OK).json(await TaskService.getTask(taskId));
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }

    public async createTask(req: Request, res: Response): Promise<void> {
        try {
            const taskRequest = extractTaskFromBody(req);

            const task = await TaskService.createTask(taskRequest);

            if (!task) {
                res.status(CodeError.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create task' });
                return;
            }

            res.status(CodeError.CREATED).json(task);
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }

    public async updateTask(req: Request, res: Response): Promise<void> {
        try {
            const taskId = parseInt(req.params.id);

            if (!taskId) {
                res.status(CodeError.BAD_REQUEST).json({ message: 'Miss task id!' });
                return;
            }

            const taskRequest = extractTaskFromBody(req);

            const task = await TaskService.updateTask(taskRequest, taskId);

            if (!task) {
                res.status(CodeError.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create task' });
                return;
            }

            res.status(CodeError.OK).json(task);
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }
}
