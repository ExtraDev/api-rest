import { Task } from "../tasks/task.model";

export interface Project {
    id: number;
    name: string;
    description: string
    tasks?: Array<Task>;
}