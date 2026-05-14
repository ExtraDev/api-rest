import { Request } from "express";
import { TaskRequest } from "./models/task.request.model";

export function extractTaskFromBody(req: Request): TaskRequest {
    const { id, title, description, status, created_at } = req.body;

    if (!title) {
        throw new Error('Task title cannot be empty');
    }

    return new TaskRequest(title, id, description, status, created_at);
}
