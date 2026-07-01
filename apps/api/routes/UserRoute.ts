import { Router, Request, Response } from "express";
import { CREATE_USER_ENDPOINT } from "../utils/exportedVariables";
import UserController from "../controllers/UserController";

const UserRoute = Router();


UserRoute.post(CREATE_USER_ENDPOINT, (req: Request, res: Response) => {
    const user = new UserController();

    const createUser = user.createUser();

    res.send({ createUser });
})


export default UserRoute;