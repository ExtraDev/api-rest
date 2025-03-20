import { Request } from "express";
import { ProjectRequest } from "./models/project.request.model";

export function extractProjectFromBody(req: Request): ProjectRequest {
    const { name, description, tasks } = req.body;

    if (!name) {
        throw new Error('Project name cannot be empty');
    }

    if (!description) {
        throw new Error('Project description cannot be empty');
    }

    return new ProjectRequest(name, description, tasks);
}