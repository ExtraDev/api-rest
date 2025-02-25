import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { extractUserAuthFromBody, extractUserFromBody } from "./users.helper";
import * as UserService from "./users.service";

dotenv.config();

export class UserController {
    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await UserService.getUsers());
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'An error occurred' });
        }
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id);

            const user = await UserService.getUser(userId);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'An error occurred' });
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = extractUserFromBody(req);

            if (!newUser.password) {
                res.status(500).json({ error: 'Password cannot be empty while creating user' });
                return;
            }

            if (!process.env.BCRYPT_SALT_ROUND) {
                res.status(500).json({ error: 'Server error' });
                return;
            }

            newUser.password = await bcrypt.hash(newUser.password, parseInt(process.env.BCRYPT_SALT_ROUND));

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

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id);
            const userUpdate = extractUserFromBody(req);

            if (!userUpdate.password) {
                res.status(500).json({ error: 'Password cannot be empty while creating user' });
                return;
            }

            if (!process.env.BCRYPT_SALT_ROUND) {
                res.status(500).json({ error: 'Server error' });
                return;
            }

            userUpdate.password = await bcrypt.hash(userUpdate.password, parseInt(process.env.BCRYPT_SALT_ROUND));

            const userUpdated = await UserService.updateUser(userUpdate, userId);

            if (!userUpdated) {
                res.status(500).json({ error: 'Failed to update user' });
                return;
            }

            res.status(200).json(userUpdated);
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'An error occurred' });
        }
    }

    public async authenticate(req: Request, res: Response): Promise<void> {
        try {
            const userAuth = extractUserAuthFromBody(req);

            const user = await UserService.login(userAuth);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            if (user.password && !await bcrypt.compare(userAuth.password, user.password)) {
                res.status(503).json({ error: 'Authentication failed' });
                return;
            }

            if (!process.env.TOKEN_SECRET) {
                res.status(500).json({ error: 'Server error' });
                return;
            }

            // return token
            const token_jwt = jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email,
            }, process.env.TOKEN_SECRET);

            res.status(200).json({ token: token_jwt });
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'An error occurred' });
        }
    }
}
