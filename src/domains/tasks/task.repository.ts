import { db } from "../../database/database";
import { TaskRequest, TaskResponse, TaskResponseSchema } from "./schema/task.request.schema";

export class TaskRepository {
    public async getTasks(): Promise<ReadonlyArray<TaskResponse>> {
        const rows = db.prepare(`SELECT * FROM tasks`).all();
        return TaskResponseSchema.array().parse(rows);
    }

    public async getTask(taskId: number | bigint): Promise<TaskResponse> {
        const rows = db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(taskId);
        return TaskResponseSchema.parse(rows);
    }

    public async createTask(taskRequest: TaskRequest): Promise<TaskResponse> {
        const result = db.prepare(`
            INSERT INTO tasks (
                name,
                status,
                description
            )
            VALUES (?, ?, ?)
        `).run(
            taskRequest.name,
            taskRequest.status,
            taskRequest.description ?? null
        );

        const taskId = result.lastInsertRowid;
        if (!taskId) {
            throw new Error('Error while creating task');
        }

        return TaskResponseSchema.parse(await this.getTask(taskId));
    }

    public async updateTask(taskId: number, taskRequest: TaskRequest): Promise<TaskResponse> {
        const result = db.prepare(`
            UPDATE tasks
            SET name = ?, status = ?, description = ?
            WHERE id = ?
        `).run(
            taskRequest.name,
            taskRequest.status,
            taskRequest.description ?? null,
            taskId
        );

        if (result.changes <= 0) {
            throw new Error('Error while updating task');
        }

        return TaskResponseSchema.parse(await this.getTask(taskId));
    }
}