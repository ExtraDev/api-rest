import { z } from "zod";
import { TaskStatus } from "../models/task.status.model";

export const taskRequestSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus).default(TaskStatus.TODO),
    idProject: z.number().optional(),
});