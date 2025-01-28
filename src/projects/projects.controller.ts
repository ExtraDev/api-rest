import { Request, Response } from "express";
import { extractProjectFromBody } from "./projects.helper";
import * as ProjectService from "./projects.service";

export class ProjectController {
    public async getProjects(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await ProjectService.getProjects());
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'An error occurred' });
        }
    }

    public async getProject(req: Request, res: Response): Promise<void> {
        try {
            const projectId = parseInt(req.params.id);

            if (!projectId) {
                res.status(400).json({ message: 'Miss project id!' });
                return;
            }

            const project = await ProjectService.getProject(projectId);

            if (!project) {
                res.status(404).json({ message: 'Project not found' });
                return;
            }

            project.tasks = await ProjectService.getTasks(projectId);
            res.status(200).json(project);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'An error occurred' });
        }
    }

    public async createProject(req: Request, res: Response): Promise<void> {
        try {
            const newProject = extractProjectFromBody(req);

            const project = await ProjectService.createProjet(newProject);

            if (!project) {
                res.status(500).json({ message: 'Failed to create project' });
                return;
            }

            res.status(200).json(project);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'An error occurred' });
        }
    }

    public async updateProject(req: Request, res: Response): Promise<void> {
        try {
            const projectId = parseInt(req.params.id);

            if (!projectId) {
                res.status(400).json({ message: 'Miss project id!' });
                return;
            }

            const projectToUpdated = extractProjectFromBody(req);

            const project = await ProjectService.updateProject(projectToUpdated, projectId);

            if (!project) {
                res.status(500).json({ message: 'Failed to update project' });
                return;
            }

            res.status(200).json(project);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'An error occurred' });
        }
    }
}