import { NextFunction, Request, Response } from "express";
import { CodeError } from "../common/errors/messages.errors";
import { extractTokenJwt, extractTokenObject } from "../common/helpers/jwt.helpers";

/**
 * Description: Check is the user can update the ressource
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const canUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);
    const token = extractTokenJwt(req);

    if (!token) {
        return res.status(CodeError.UNAUTHORIZED).json({ message: 'Token missing' });
    }

    const userToken = extractTokenObject(token);

    if (userToken.id !== userId) {
        return res.status(CodeError.FORBIDDEN).json({ message: 'You can\'t edit this ressource' });
    }

    return next();
}