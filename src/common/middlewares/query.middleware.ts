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

export const logAction = async (req: Request, res: Response, next: NextFunction) => {
    // Push in DB
    console.log(req.body, req.params, req.route.path, req.route.methods);
    return next();
}