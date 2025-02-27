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
    const [result] = await pool.execute(`
        INSERT INTO projects (name, description)
        VALUES (?, ?)
    `, [project.name, project.description]);

    const projectId = (result as mysql.ResultSetHeader).insertId;

    return getProject(projectId);
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