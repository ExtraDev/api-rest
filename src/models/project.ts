import { Task } from "./task";

export interface Project {
    id: number;
    name: string;
    description: string
    tasks?: Array<Task>;
}