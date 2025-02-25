import mysql from 'mysql2/promise';
import { pool } from '../app';
import { wrapQueryResult, wrapQueryResults } from '../common/helpers/query.helper';
import { TaskResponse } from '../tasks/models/task.response.model';
import { Project } from './project.model';

export async function getProjects(): Promise<Array<Project> | undefined> {
    return wrapQueryResults<Project>(await pool.query("SELECT * FROM projects"));
}

export async function createProjet(project: Project): Promise<Project | undefined> {
    const { name, description } = project;

    const [result] = await pool.execute(`
        INSERT INTO projects (name, description)
        VALUES (?, ?)
    `, [name, description]);

    const projectId = (result as mysql.ResultSetHeader).insertId;

    return getProject(projectId);
}

export async function getProject(id: number): Promise<Project | undefined> {
    return wrapQueryResult<Project>(
        await pool.query(`
            SELECT * 
            FROM projects WHERE id = ?`,
            [id]
        )
    );
};

export async function updateProject(project: Project, projectId: number): Promise<Project | undefined> {
    const { name, description } = project;

    await pool.query(`
        UPDATE projects 
        SET name = ?, description = ? 
        WHERE id = ?`,
        [name, description, projectId]
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