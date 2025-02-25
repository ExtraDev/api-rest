import { TaskStatus } from "./task.status.model";

export class TaskResponse {
    public id: number;
    public title: string;
    public description?: string;
    public status: TaskStatus;
    public created_at: Date;
    public idProject: number;

    constructor(id: number, title: string, description: string, status: TaskStatus, created_at: Date, idProject: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.created_at = created_at;
        this.idProject = idProject;
    }
}