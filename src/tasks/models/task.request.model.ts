import { TaskStatus } from "./task.status.model";

export class TaskRequest {
    public id?: number;
    public title: string;
    public description?: string;
    public status: TaskStatus;
    public created_at?: Date;
    public idProject?: number;

    constructor(title: string, id?: number, description?: string, status?: TaskStatus, idProject?: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status === undefined ? TaskStatus.TODO : status;
        this.created_at = new Date();
        this.idProject = idProject;
    }

    static fromJson(data: any): TaskRequest {
        return new TaskRequest(
            data.title,
            data.id,
            data.description,
            data.status,
            data.idProject
        );
    }
}

