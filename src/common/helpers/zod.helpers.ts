import { ZodError } from "zod";

export function formatZodError(error: ZodError) {
    return error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message
    }));
}