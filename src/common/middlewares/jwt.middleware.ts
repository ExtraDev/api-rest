import { NextFunction, Request, Response } from 'express';
import * as jwt from "jsonwebtoken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer' || !req.headers.authorization.split(' ')[1]) {
        return res.status(503).json({ message: 'Token missing' });
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!process.env.TOKEN_SECRET) {
        res.status(500).json({ error: 'Server error' });
        return;
    }

    try {
        if (jwt.verify(token, process.env.TOKEN_SECRET)) {
            return next();
        }
    } catch (e) {
        return res.status(503).json({ message: 'Unable to check token' });
    }

    return res.status(503).json({ message: 'Invalid token' });
}