import { NextFunction, Request, Response } from "express";
import { CodeError } from "../errors/messages.errors";
import { extractTokenJwt, extractTokenObject } from "../helpers/jwt.helpers";

export const isBodySetted = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(CodeError.BAD_REQUEST).json({ message: 'Empty body!' });
    }

    return next();
}

export const isParamsSetted = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params || Object.keys(req.params).length === 0) {
        return res.status(CodeError.BAD_REQUEST).json({ message: 'Missing params!' });
    }

    return next();
}

export const validateJsonFormat = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(CodeError.BAD_REQUEST).json({ error: 'Invalid JSON format' });
    } else {
        next(err);
    }
}

export const logAction = async (req: Request, res: Response, next: NextFunction) => {
    // Push in DB
    const token = extractTokenJwt(req);

    if (!token) {
        console.log(new Date().toISOString(), req.body, req.params, req.url, req.method);
        return next();
    }

    const user = extractTokenObject(token);
    console.log(new Date().toISOString(), user?.username || user?.email || user?.id, req.body, req.params, req.url, req.method);
    return next();
}