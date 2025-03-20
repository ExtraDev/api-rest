import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { CodeError } from "../common/errors/messages.errors";
import { extractUserAuthFromBody, extractUserFromBody } from "./users.helper";
import * as UserService from "./users.service";

dotenv.config();

export class UserController {
    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            res.status(CodeError.OK).json(await UserService.getUsers());
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id);

            const user = await UserService.getUser(userId);

            if (!user) {
                res.status(CodeError.NOT_FOUND).json({ message: 'User not found' });
                return;
            }

            res.status(CodeError.OK).json(user);
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = extractUserFromBody(req);

            if (!newUser.password) {
                res.status(CodeError.BAD_REQUEST).json({ error: 'Password cannot be empty while creating user' });
                return;
            }

            if (!process.env.BCRYPT_SALT_ROUND) {
                res.status(CodeError.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
                return;
            }

            newUser.password = await bcrypt.hash(newUser.password, parseInt(process.env.BCRYPT_SALT_ROUND));

            const user = await UserService.createUser(newUser);

            if (!user) {
                res.status(CodeError.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create user' });
                return;
            }

            res.status(CodeError.CREATED).json(user);
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id);
            const userRequest = extractUserFromBody(req);

            if (!userRequest.password) {
                res.status(CodeError.BAD_REQUEST).json({ error: 'Password cannot be empty while creating user' });
                return;
            }

            if (!process.env.BCRYPT_SALT_ROUND) {
                res.status(CodeError.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
                return;
            }

            userRequest.password = await bcrypt.hash(userRequest.password, parseInt(process.env.BCRYPT_SALT_ROUND));

            const userUpdated = await UserService.updateUser(userRequest, userId);

            if (!userUpdated) {
                res.status(CodeError.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update user' });
                return;
            }

            res.status(CodeError.OK).json(userUpdated);
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }

    public async authenticate(req: Request, res: Response): Promise<void> {
        try {
            const userAuth = extractUserAuthFromBody(req);

            const user = await UserService.login(userAuth);

            if (!user) {
                res.status(CodeError.NOT_FOUND).json({ error: 'User not found' });
                return;
            }

            if (user.password && !await bcrypt.compare(userAuth.password, user.password)) {
                res.status(CodeError.FORBIDDEN).json({ error: 'Authentication failed' });
                return;
            }

            if (!process.env.TOKEN_SECRET) {
                res.status(CodeError.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
                return;
            }

            const token_jwt = jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email,
            }, process.env.TOKEN_SECRET);

            res.status(CodeError.OK).json({ token: token_jwt });
        } catch (error: any) {
            res.status(CodeError.BAD_REQUEST).json({ error: error.message || 'An error occurred' });
        }
    }
}
