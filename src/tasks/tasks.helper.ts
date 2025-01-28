import { Request } from "express";
import { Task } from "./task.model";

export function extractTaskFromBody(req: Request): Task {
    const { title, description, status, created_at } = req.body as Task;

    if (!title) {
        throw new Error('Task title cannot be empty');
    }

    return {
        title: title,
        description: description,
        status: status,
        created_at: created_at
    } as Task;
}
