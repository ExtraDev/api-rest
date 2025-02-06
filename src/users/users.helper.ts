import { Request } from "express";
import { User, UserAuth } from "./user.model";

export function extractUserFromBody(req: Request): User {
    const { id, firsname, lastname, username, email, address, phone, password } = req.body as User;

    if (!username) {
        throw new Error('Username cannot be empty');
    }

    if (!email) {
        throw new Error('Email cannot be empty');
    }

    return {
        id: id,
        firsname: firsname,
        lastname: lastname,
        username: username,
        email: email,
        address: address,
        phone: phone,
        password: password
    } as User;
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
