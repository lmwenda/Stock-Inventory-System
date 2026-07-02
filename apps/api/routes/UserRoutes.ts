import { Router, Request, Response } from "express";
import { userController} from "../app";
import { CREATE_USER_ENDPOINT } from "../utils/exportedVariables";

const UserRoute = Router();


UserRoute.post(CREATE_USER_ENDPOINT, (req: Request, res: Response) => {
    userController.createUser(req, res);
})


export default UserRoute;