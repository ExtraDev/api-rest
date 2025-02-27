import { NextFunction, Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import { CodeError } from '../errors/messages.errors';
import { extractTokenJwt } from '../helpers/jwt.helpers';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = extractTokenJwt(req);

    if (!token) {
        return res.status(CodeError.UNAUTHORIZED).json({ message: 'Token missing' });
    }

    if (!process.env.TOKEN_SECRET) {
        res.status(CodeError.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
        return;
    }

    try {
        if (jwt.verify(token, process.env.TOKEN_SECRET)) {
            return next();
        }
    } catch (e) {
        return res.status(CodeError.INTERNAL_SERVER_ERROR).json({ message: 'Unable to check token' });
    }

    return res.status(CodeError.FORBIDDEN).json({ message: 'Invalid token' });
}