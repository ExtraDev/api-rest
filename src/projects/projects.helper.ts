import { Request } from "express";
import { Project } from "./project.model";

export function extractProjectFromBody(req: Request): Project {
    const { name, description } = req.body as Project;

    if (!name) {
        throw new Error('Project name cannot be empty');
    }

    if (!description) {
        throw new Error('Project description cannot be empty');
    }

    return {
        name: name,
        description: description
    } as Project;
}