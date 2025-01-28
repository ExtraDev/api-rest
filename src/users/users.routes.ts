import { Router } from "express";
import { isBodySetted, logAction } from "../common/middlewares/query.middleware";
import { UserController } from "./users.controller";

const userController = new UserController();

export default (router: Router) => {
    router.get("/users", logAction, userController.getUsers);

    router.post("/users", logAction, isBodySetted, userController.createUser);
}