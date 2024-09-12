import { Request, Response } from "express";
import { Project } from "../models/project";
import * as ProjectService from "../services/projectService";

export class ProjectController {
    public async getProjects(req: Request, res: Response): Promise<void> {
        try {
            const tasks: Array<Project> = await ProjectService.getProjects();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch tasks" });
        }
    }

    public async getProject(req: Request, res: Response): Promise<void> {
        try {
            const projectId = parseInt(req.params.id);
            const project = await ProjectService.getProject(projectId);

            if (!project) {
                res.status(404).json('No project found');
                return;
            }

            project.tasks = await ProjectService.getTasks(projectId);
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch tasks" });
        }
    }
}