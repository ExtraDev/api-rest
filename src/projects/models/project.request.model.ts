import { TaskRequest } from "../../tasks/models/task.request.model";

export class ProjectRequest {
    public id?: number;
    public name: string;
    public description: string
    public tasks?: Array<TaskRequest>;

    constructor(name: string, description: string, tasks?: Array<TaskRequest>) {
        this.name = name;
        this.description = description;

        if (tasks) {
            this.tasks = tasks.map(task => new TaskRequest(task.title, task.id, task.description, task.status, task.idProject))
        }
    }
}