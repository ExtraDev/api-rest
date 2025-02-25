import { TaskResponse } from "../../tasks/models/task.response.model";

export class ProjectResponse {
    public id: number;
    public name: string;
    public description: string
    public tasks: Array<TaskResponse>;

    constructor(id: number, name: string, description: string, tasks: Array<TaskResponse>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.tasks = tasks;
    }
}