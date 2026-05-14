import { z } from "zod";
import { nullableToOptional } from "../../../common/helpers/schema.helper";

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

/* Create model */
export const TaskRequestSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
    description: nullableToOptional(z.string()),
});

export type TaskRequest = z.infer<typeof TaskRequestSchema>;

/* Read models */
export const TaskResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
    description: nullableToOptional(z.string()),
});

export type TaskResponse = z.infer<typeof TaskResponseSchema>;