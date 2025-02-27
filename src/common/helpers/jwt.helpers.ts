import { Request } from 'express';
import * as jwt from "jsonwebtoken";

export interface UserToken {
    id: number,
    username?: string
    email?: string
}

export function extractTokenJwt(req: Request): string | undefined {
    if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer' || !req.headers.authorization.split(' ')[1]) {
        return undefined;
    }

    return req.headers.authorization.split(' ')[1];
}

export function extractTokenObject(token: string): UserToken {
    const decode = jwt.decode(token) as jwt.JwtPayload;
    const { id, username, email } = decode;

    return {
        id: id,
        username: username,
        email: email
    } as UserToken;
}