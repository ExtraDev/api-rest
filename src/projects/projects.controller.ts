import { Request, Response } from "express";
import { Project } from "./project.model";
import * as ProjectService from "./projects.service";

export class ProjectController {
    public async getProjects(req: Request, res: Response): Promise<void> {
        try {
            const projects = await ProjectService.getProjects();

            if (!projects) {
                res.status(404).json('No projects found');
                return;
            }

            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch projects" });
        }
    }

    public async getProject(req: Request, res: Response): Promise<void> {
        try {
            const projectId = parseInt(req.params.id);
            const project = await ProjectService.getProject(projectId);

            if (!project) {
                res.status(404).json('Project not found');
                return;
            }

            project.tasks = await ProjectService.getTasks(projectId);
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch project" });
        }
    }

    public async createProject(req: Request, res: Response): Promise<void> {
        try {
            const newProject = {
                name: req.body.name || undefined,
                description: req.body.description || undefined
            } as Project;

            console.log(newProject);

            const project = await ProjectService.createProjet(newProject);

            if (!project) {
                res.status(500).json('Failed to create project');
                return;
            }

            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    public async updateProject(req: Request, res: Response): Promise<void> {
        try {
            const projectId = parseInt(req.params.id);

            if (!projectId) {
                res.status(400).json('Miss project id!');
                return;
            }

            const newProject = {
                name: req.body.name || undefined,
                description: req.body.description || undefined
            } as Project;

            const project = await ProjectService.updateProject(newProject, projectId);

            if (!project) {
                res.status(500).json('Failed to update project');
                return;
            }

            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}