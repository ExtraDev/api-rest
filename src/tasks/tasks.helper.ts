import { Request } from "express";
import { Task } from "./task.model";

export function extractTaskFromBody(req: Request): Task {
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new Error('Empty body');
    }

    return {
        title: req.body.title || null,
        description: req.body.description || null,
        status: req.body.status || null,
        created_at: req.body.created_at || null
    } as Task;
}

export function checkTaskMandatoryFields(task: Task) {
    const { title } = task;

    if (title === null) {
        throw new Error('Task title cannot be empty');
    }
}