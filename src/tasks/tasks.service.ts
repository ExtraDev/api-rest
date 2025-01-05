import { pool } from '../app';
import { Task } from './tasks.model';


export async function getTasks(): Promise<Array<Task>> {
    try {
        const [rows] = await pool.query("SELECT * FROM tasks");
        return rows as Array<Task>;
    } catch (e) {
        console.log(e);
        return new Array<Task>();
    }
}