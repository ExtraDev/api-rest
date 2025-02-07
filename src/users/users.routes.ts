import { Router } from "express";
import { isAuthenticated } from "../common/middlewares/jwt.middleware";
import { isBodySetted, logAction } from "../common/middlewares/query.middleware";
import { UserController } from "./users.controller";

const userController = new UserController();

export default (router: Router) => {
    router.get("/users", logAction, isAuthenticated, userController.getUsers);

    router.post("/users", logAction, isAuthenticated, isBodySetted, userController.createUser);
    router.post("/users/auth", logAction, isBodySetted, userController.authenticate);
}