export enum CodeError {
    "OK" = 200,
    "CREATED" = 201, // Post operation success
    "NO_CONTENT" = 204, // Operation success, but no content to return
    "BAD_REQUEST" = 400,
    "UNAUTHORIZED" = 401, // No active session
    "FORBIDDEN" = 403, // Client does not have permissions
    "NOT_FOUND" = 404,
    "INTERNAL_SERVER_ERROR" = 500,
    "SERVICE_UNAVAILABLE" = 503
};