import { pool } from '../app';
import { Project } from '../models/project';
import { Task } from '../models/task';

export async function getProjects(): Promise<Array<Project> | undefined> {
    const [rows] = await pool.query("SELECT * FROM projects");
    const projects = rows as Array<Project>;

    if (projects.length === 0) {
        return undefined;
    }

    return projects;
}

export async function getProject(id: number): Promise<Project | undefined> {
    const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);
    const projects = rows as Array<Project>;

    if (projects.length === 0) {
        return undefined;
    }

    return projects[0];
};

export async function getTasks(id: number): Promise<Array<Task> | undefined> {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE idProject = ?", [id]);
    const tasks = rows as Array<Task>;

    if (tasks.length === 0) {
        return undefined;
    }

    return tasks;
};