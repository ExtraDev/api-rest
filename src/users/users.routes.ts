import { Router } from "express";
import { isBodySetted, isParamsSetted } from "../common/middlewares/query.middlewares";
import { UserController } from "./users.controller";
import { canUpdate } from "./users.middlewares";

const userController = new UserController();

export default (router: Router) => {
    router.get("/users", userController.getUsers);
    router.get("/users/:id", isParamsSetted, userController.getUser);

    router.post("/users", isBodySetted, userController.createUser);
    router.post("/users/auth", isBodySetted, userController.authenticate);

    router.put("/users/:id", isParamsSetted, isBodySetted, canUpdate, userController.updateUser);
}