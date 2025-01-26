import { Request } from "express";
import { Project } from "./project.model";

export function extractProjectFromBody(req: Request): Project {
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new Error('Empty body');
    }

    return {
        name: req.body.name || null,
        description: req.body.description || null
    } as Project;
}

export function checkProjectMandatoryFields(project: Project) {
    const { name, description } = project;

    if (name === null) {
        throw new Error('Project name cannot be empty');
    }

    if (description === null) {
        throw new Error('Project description cannot be empty');
    }
}