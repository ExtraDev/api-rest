import { Request } from "express";
import { User } from "./user.model";

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
