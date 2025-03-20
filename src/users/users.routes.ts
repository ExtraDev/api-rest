import { Router } from "express";
import { isAuthenticated } from "../common/middlewares/jwt.middlewares";
import { isBodySetted, isParamsSetted } from "../common/middlewares/query.middlewares";
import { UserController } from "./users.controller";
import { canUpdate } from "./users.middlewares";

const userController = new UserController();

export default (router: Router) => {
    router.get("/users", isAuthenticated, userController.getUsers);
    router.get("/users/:id", isAuthenticated, isParamsSetted, userController.getUser);

    router.post("/users", isBodySetted, userController.createUser);
    router.post("/users/auth", isBodySetted, userController.authenticate);

    router.put("/users/:id", isAuthenticated, isParamsSetted, isBodySetted, canUpdate, userController.updateUser);
}