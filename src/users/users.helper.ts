import { Request } from "express";
import { UserRequest } from "./models/user.request.model";
import { UserAuth } from "./user.model";

export function extractUserFromBody(req: Request): UserRequest {
    const { id, firsname, lastname, username, email, address, phone, password } = req.body;

    if (!username) {
        throw new Error('Username cannot be empty');
    }

    if (!email) {
        throw new Error('Email cannot be empty');
    }

    return new UserRequest(username, email, id, firsname, lastname, phone, address, password);
}

export function extractUserAuthFromBody(req: Request): UserAuth {
    const { login, password } = req.body as UserAuth;

    if (!login) {
        throw new Error('Login cannot be empty');
    }

    if (!password) {
        throw new Error('Password cannot be empty');
    }

    return {
        login: login,
        password: password
    } as UserAuth;
}
