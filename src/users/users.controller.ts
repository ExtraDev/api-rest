import { Request, Response } from "express";
import { extractUserFromBody } from "./users.helper";
import * as UserService from "./users.service";

export class UserController {
    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await UserService.getUsers());
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'An error occurred' });
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = extractUserFromBody(req);
            newUser.password = crypto.randomUUID();

            const user = await UserService.createUser(newUser);

            if (!user) {
                res.status(500).json({ error: 'Failed to create user' });
                return;
            }

            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'An error occurred' });
        }
    }
}
