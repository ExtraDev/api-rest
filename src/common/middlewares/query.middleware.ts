import { NextFunction, Request, Response } from "express";

export const isBodySetted = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Empty body!' });
    }

    return next();
}

export const isParamsSetted = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params || Object.keys(req.params).length === 0) {
        return res.status(400).json({ message: 'Missing params!' });
    }

    return next();
}

export const validateJsonFormat = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).json({ error: 'Invalid JSON format' });
    } else {
        next(err);
    }
}

export const logAction = async (req: Request, res: Response, next: NextFunction) => {
    // Push in DB
    console.log(new Date().toISOString(), req.body, req.params, req.route?.path, req.route?.methods);
    return next();
}