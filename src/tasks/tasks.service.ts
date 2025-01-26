import mysql from 'mysql2/promise';
import { pool } from '../app';
import { wrapQueryResult, wrapQueryResults } from '../helpers/query.helper';
import { Task } from './task.model';


export async function getTasks(): Promise<Array<Task>> {
    return wrapQueryResults<Task>(await pool.query("SELECT * FROM tasks"));
}

export async function getTask(taskId: number): Promise<Task | undefined> {
    return wrapQueryResult<Task>(
        await pool.query(`
            SELECT * FROM tasks
            WHERE id = ?
        `, [taskId])
    );
}

export async function createTask(task: Task): Promise<Task | undefined> {
    const { title, description, status, created_at } = task;

    const [result] = await pool.query(`
        INSERT INTO tasks(title, description, status, created_at)
        VALUES (?,?,?,?)
        `, [title, description, status, created_at]);

    const taskId = (result as mysql.ResultSetHeader).insertId;

    return getTask(taskId);
}