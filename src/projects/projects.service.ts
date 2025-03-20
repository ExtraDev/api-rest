import mysql from 'mysql2/promise';
import { pool } from '../app';
import { wrapQueryResult, wrapQueryResults } from '../common/helpers/query.helpers';
import { TaskResponse } from '../tasks/models/task.response.model';
import { ProjectRequest } from './models/project.request.model';
import { ProjectResponse } from './models/project.response.model';

export async function getProjects(): Promise<Array<ProjectResponse>> {
    return wrapQueryResults<ProjectResponse>(await pool.query("SELECT * FROM projects"));
}

export async function createProjet(project: ProjectRequest): Promise<ProjectResponse | undefined> {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        const [result] = await connection.execute(
            `INSERT INTO projects (name, description) VALUES (?, ?)`,
            [project.name, project.description]
        );

        const projectId = (result as mysql.ResultSetHeader).insertId;

        if (!projectId) {
            throw new Error("Échec de la création du projet");
        }

        if (project.tasks && project.tasks.length > 0) {
            for (const task of project.tasks) {
                console.log(task.title, task.description, task.status, task.getCreatedAt(), projectId);
                await connection.execute(
                    `INSERT INTO tasks (title, description, status, created_at, idProject) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [task.title, task.description ?? null, task.status, task.getCreatedAt(), projectId]
                );
            }
        }

        await connection.commit();

        return getProject(projectId);
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return undefined;
    } finally {
        connection.release();
    }
}

export async function getProject(id: number): Promise<ProjectResponse | undefined> {
    return wrapQueryResult<ProjectResponse>(
        await pool.query(`
            SELECT * 
            FROM projects WHERE id = ?`,
            [id]
        )
    );
};

export async function updateProject(project: ProjectRequest, projectId: number): Promise<ProjectResponse | undefined> {
    await pool.query(`
        UPDATE projects 
        SET name = ?, description = ? 
        WHERE id = ?`,
        [project.name, project.description, projectId]
    );

    return getProject(projectId);
};

export async function getTasks(projectId: number): Promise<Array<TaskResponse>> {
    return wrapQueryResults(
        await pool.query(`
            SELECT * FROM tasks 
            WHERE idProject = ?`,
            [projectId]
        )
    );
};