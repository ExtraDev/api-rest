import mysql from 'mysql2/promise';
import { pool } from '../app';
import { wrapQueryResult, wrapQueryResults } from '../common/helpers/query.helper';
import { TaskRequest } from './models/task.request.model';
import { TaskResponse } from './models/task.response.model';


export async function getTasks(): Promise<Array<TaskResponse>> {
    return wrapQueryResults<TaskResponse>(await pool.query("SELECT * FROM tasks"));
}

export async function getTask(taskId: number): Promise<TaskResponse | undefined> {
    return wrapQueryResult<TaskResponse>(
        await pool.query(`
            SELECT * FROM tasks
            WHERE id = ?
        `, [taskId])
    );
}

export async function createTask(task: TaskRequest): Promise<TaskResponse | undefined> {
    const [result] = await pool.query(`
        INSERT INTO tasks(title, description, status, created_at)
        VALUES (?,?,?,?)
        `, [task.title, task.description, task.status, task.getCreatedAt()]);

    const taskId = (result as mysql.ResultSetHeader).insertId;

    return getTask(taskId);
}

export async function updateTask(task: TaskRequest, taskId: number): Promise<TaskResponse | undefined> {
    await pool.query(`
        UPDATE tasks
        SET title = ?, description = ?, status = ?, idProject = ?
        WHERE id = ?`,
        [task.title, task.description, task.status, task.idProject, task.id]
    );

    return getTask(taskId);
}

export async function deleteTask(taskid: number) {
    try {
        await pool.query(`
            DELETE
            FROM tasks
            WHERE id = ?`,
            [taskid]
        );
    } catch (error) {
        console.log(error);
    }
}