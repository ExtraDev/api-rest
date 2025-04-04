import { Request, Response } from "express";
import { CodeError } from "../common/errors/messages.errors";
import { extractProjectFromBody } from "./projects.helper";
import * as ProjectService from "./projects.service";

export class ProjectController {
    public async getProjects(req: Request, res: Response): Promise<void> {
        try {
            res.status(CodeError.OK).json(await ProjectService.getProjects());
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }

    public async getProject(req: Request, res: Response): Promise<void> {
        try {
            const projectId = parseInt(req.params.id);

            if (!projectId) {
                res.status(CodeError.BAD_REQUEST).json({ message: 'Miss project id!' });
                return;
            }

            const project = await ProjectService.getProject(projectId);

            if (!project) {
                res.status(404).json({ message: 'Project not found' });
                return;
            }

            project.tasks = await ProjectService.getTasks(projectId);
            res.status(CodeError.OK).json(project);
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }

    public async createProject(req: Request, res: Response): Promise<void> {
        try {
            const projectRequest = extractProjectFromBody(req);

            const project = await ProjectService.createProjet(projectRequest);

            if (!project) {
                res.status(CodeError.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create project' });
                return;
            }

            project.tasks = await ProjectService.getTasks(project.id);

            res.status(CodeError.CREATED).json(project);
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }

    public async updateProject(req: Request, res: Response): Promise<void> {
        try {
            const projectId = parseInt(req.params.id);

            if (!projectId) {
                res.status(CodeError.BAD_REQUEST).json({ message: 'Miss project id!' });
                return;
            }

            const projectRequest = extractProjectFromBody(req);

            const project = await ProjectService.updateProject(projectRequest, projectId);

            if (!project) {
                res.status(CodeError.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update project' });
                return;
            }

            res.status(CodeError.OK).json(project);
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }

    public async deleteProject(req: Request, res: Response): Promise<void> {
        try {
            const projectId = parseInt(req.params.id);

            if (!projectId) {
                res.status(CodeError.BAD_REQUEST).json({ message: 'Miss project id!' });
                return;
            }

            const project = await ProjectService.deleteProject(projectId);

            if (!project) {
                res.status(CodeError.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete project' });
                return;
            }

            res.status(CodeError.OK).json(project);
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }
}