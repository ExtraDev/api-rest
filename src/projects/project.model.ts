import { Task } from "../tasks/task.model";

export class Project {
    public id?: number;
    public name?: string;
    public description?: string
    public tasks?: Array<Task>;
}