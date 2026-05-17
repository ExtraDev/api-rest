import { TaskRequest, TaskResponse } from "./schema/task.request.schema";
import { TaskRepository } from "./task.repository";

export class TaskService {
    public constructor(private repository: TaskRepository) {
    }

    public async getTasks(): Promise<ReadonlyArray<TaskResponse>> {
        return await this.repository.getTasks();
    }

    public async getTask(taskId: number): Promise<TaskResponse> {
        return await this.repository.getTask(taskId);
    }

    public async createTask(task: TaskRequest): Promise<TaskResponse> {
        return await this.repository.createTask(task);
    }

    public async updateTask(taskId: number, task: TaskRequest): Promise<TaskResponse> {
        return await this.repository.updateTask(taskId, task);
    }
}