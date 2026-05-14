import { TaskRequest, TaskResponse } from "./schema/task.request.schema";
import { TaskRepository } from "./task.repository";

export class TaskService {
    public constructor(private repository: TaskRepository) {
    }

    public async getTasks(): Promise<ReadonlyArray<TaskResponse>> {
        return await this.repository.getTasks();
    }

    public async createTask(task: TaskRequest): Promise<TaskResponse> {
        return await this.repository.createTask(task.name, task.status, task.description);
    }
}