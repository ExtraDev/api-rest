import { formatInTimeZone } from "date-fns-tz";
import { TaskStatus } from "./task.status.model";

export class TaskRequest {
    public id?: number;
    public title: string;
    public description?: string;
    public status: TaskStatus;
    private created_at?: Date;
    public idProject?: number;

    constructor(title: string, id?: number, description?: string, status?: TaskStatus, created_at?: Date, idProject?: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status === undefined ? TaskStatus.TODO : status;
        this.created_at = created_at === undefined ? new Date() : created_at;
        this.idProject = idProject;
    }

    public getCreatedAt(): string {
        return formatInTimeZone(this.created_at || new Date(), 'Europe/Zurich', "yyyy-MM-dd'T'HH:mm:ss.SSS");
    }
}