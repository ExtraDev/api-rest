import { Task } from "../tasks/tasks.model";

export interface Project {
    id: number;
    name: string;
    description: string
    tasks?: Array<Task>;
}