import { db } from "../../database/database";
import { TaskResponse, TaskResponseSchema } from "./schema/task.request.schema";

export class TaskRepository {
    public async getTasks(): Promise<ReadonlyArray<TaskResponse>> {
        const rows = db.prepare(`
            SELECT *
            FROM tasks
            `).all();

        return TaskResponseSchema.array().parse(rows);
    }

    public async createTask(name: string, status: TaskResponse['status'], description?: string): Promise<TaskResponse> {
        const result = db.prepare(`
            INSERT INTO tasks (
                name,
                status,
                description
            )
            VALUES (?, ?, ?)
        `).run(
            name,
            status,
            description ?? null
        );

        if (!result.lastInsertRowid) {
            throw new Error('Error while creating task');
        }

        const task = db.prepare(`
            SELECT
                id,
                name,
                status,
                description
            FROM tasks
            WHERE id = ?
        `).get(result.lastInsertRowid);

        return TaskResponseSchema.parse(task);
    }
}